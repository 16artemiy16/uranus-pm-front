import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '@services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  readonly userImgUrl = 'url(https://s3.amazonaws.com/assets.saam.media/files/styles/x_large/s3/files/images/1966/SAAM-1966.48.26_1.jpg?itok=_g0Ompts)';
  readonly user = this.userService.currentUser;

  constructor(
    private readonly userService: UserService,
    private readonly title: Title
  ) {
    this.title.setTitle('Profile');
  }

}
