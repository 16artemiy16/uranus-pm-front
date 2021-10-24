import { Component } from '@angular/core';
import { AuthUserSandbox } from './store/auth-user.sandbox';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  constructor(
    private readonly authSandbox: AuthUserSandbox
  ) {
    this.authSandbox.fetchLastBoards();
    this.authSandbox.fetchLastTasks();
  }
}
