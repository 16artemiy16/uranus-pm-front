import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { Title } from '@angular/platform-browser';
import { RoutingService } from '@services/routing.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent {
  readonly signUpLink = this.routingService.routes.signUp;
  readonly signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly routingService: RoutingService,
    private readonly title: Title
  ) {
    this.title.setTitle('Sign In');
  }

  signIn() {
    const { email, password } = this.signInForm.getRawValue();
    this.userService.signIn(email, password)
      .subscribe(() => {
          this.routingService.goTo('boards');
      });
  }
}
