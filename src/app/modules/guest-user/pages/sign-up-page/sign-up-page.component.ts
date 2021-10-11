import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged, filter,
  map,
  switchMap, take,
} from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { SnackService } from '../../../common/snack/snack.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpPageComponent {
  readonly signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordAgain: ['', [Validators.required]],
    termsOfService: [false]
  });

  readonly steps: { title: string, isSuccess$: Observable<boolean> }[] = [
    {
      title: 'guest.steps.TermsAccepted',
      isSuccess$: this.signUpForm.controls.termsOfService.valueChanges,
    },
    {
      title: 'guest.steps.EmailFilled',
      isSuccess$: this.signUpForm.controls.email.statusChanges
        .pipe(
          distinctUntilChanged(),
          map((a) => a === 'VALID')
        )
    },
    {
      title: 'guest.steps.EmailFree',
      isSuccess$: this.signUpForm.controls.email.statusChanges
        .pipe(
          debounceTime(500),
          switchMap((validity) => {
            return validity === 'INVALID'
              ? of(false)
              : this.userService.isEmailFree(this.signUpForm.controls.email.value)
          })
        )
    },
    {
      title: 'guest.steps.PasswordChars',
      isSuccess$: this.signUpForm.controls.password.statusChanges
        .pipe(
          distinctUntilChanged(),
          map((a) => a === 'VALID')
        )
    },
    {
      title: 'guest.steps.PasswordsMatch',
      isSuccess$: combineLatest([
        this.signUpForm.controls.password.valueChanges,
        this.signUpForm.controls.passwordAgain.valueChanges
      ]).pipe(
        map(([pass, passAgain]) => pass === passAgain)
      )
    }
  ];

  areStepsPassed$ = combineLatest(
    this.steps.map((step) => step.isSuccess$)
  ).pipe(
    map((isSuccessList) => isSuccessList.every((isSuccess) => isSuccess))
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly snack: SnackService,
    private readonly router: Router,
    private readonly title: Title
  ) {
    this.title.setTitle('Sign Up')
  }

  signUp() {
    this.userService
      .isEmailFree(this.signUpForm.get('email')?.value)
      .pipe(
        filter(Boolean),
        switchMap(() => {
          const { email: emailControl, password: passwordControl } = this.signUpForm.controls;
          return this.userService.signUp({
            email: emailControl.value,
            password: passwordControl.value
          });
        }),
        take(1),
      )
      .subscribe(() => {
        this.snack.success('The user successfully created!');
        this.router.navigate(['..', 'sign-in'])
      });
  }
}
