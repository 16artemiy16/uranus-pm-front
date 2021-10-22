import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-navigation-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="profile-icon" [matMenuTriggerFor]="profileMenu">
      <img
        src="https://s3.amazonaws.com/assets.saam.media/files/styles/x_large/s3/files/images/1966/SAAM-1966.48.26_1.jpg?itok=_g0Ompts"
        width="40"
        height="40"
      />
      <mat-icon>expand_more</mat-icon>
    </div>

    <mat-menu #profileMenu="matMenu">
      <button mat-menu-item [routerLink]="['profile']">
        <mat-icon>person</mat-icon>
        <span>{{ 'auth.Profile' | transloco }}</span>
      </button>
      <button mat-menu-item (click)="logOut()">
        <mat-icon>logout</mat-icon>
        <span>{{ 'auth.LogOut' | transloco }}</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    .profile-icon {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    .profile-icon img {
      border-radius: 50%;
    }
  `]
})
export class NavigationProfileComponent {
  constructor(private readonly userService: UserService) {}

  logOut() {
    this.userService.logOut();
  }
}
