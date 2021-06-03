import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { UserService } from '../../../../services/user.service';

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
      title: 'Terms of Service accepted',
      isSuccess$: this.signUpForm.controls.termsOfService.valueChanges,
    },
    {
      title: 'Email is filled',
      isSuccess$: this.signUpForm.controls.email.statusChanges
        .pipe(
          distinctUntilChanged(),
          map((a) => a === 'VALID')
        )
    },
    {
      title: 'Email is not occupied',
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
      title: 'Password contains at least 6 characters',
      isSuccess$: this.signUpForm.controls.password.statusChanges
        .pipe(
          distinctUntilChanged(),
          map((a) => a === 'VALID')
        )
    },
    {
      title: 'Password is repeated',
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
    private readonly userService: UserService
  ) { }

  signUp() {
    this.userService.isEmailFree(this.signUpForm.get('email')?.value).subscribe(a => console.log('isFree', a));
  }
}
