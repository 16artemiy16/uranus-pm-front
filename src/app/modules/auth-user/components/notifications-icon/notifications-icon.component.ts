import { Component, Input } from '@angular/core';
import { NotificationI } from '../../interfaces/notification.interface';
import { UserService } from '../../../../services/user.service';
import { AuthUserSandbox } from '../../store/auth-user.sandbox';

@Component({
  selector: 'app-notifications-icon',
  templateUrl: './notifications-icon.component.html',
  styleUrls: ['./notifications-icon.component.scss']
})
export class NotificationsIconComponent {
  private readonly GLANCED_TIME_MS = 3000;

  notifications: NotificationI[] = [];

  isOpened: boolean = false;

  constructor(
    private readonly userService: UserService
  ) {
    this.userService.getMyNotifications()
      .subscribe((items) => this.notifications = items)
  }

  toggle(): void {
    this.isOpened = !this.isOpened;

    if (this.isOpened) {
      const areUnreadExist = this.notifications.some((item) => !item.isRead);
      // TODO: it will send a request to the server to mark them as read in future
      if (areUnreadExist) {
        setTimeout(() => {
          this.notifications = this.notifications.map((item) => ({ ...item, isUnread: false }));
        }, this.GLANCED_TIME_MS);
      }
    }
  }

  get counter(): number {
    return this.notifications
      .filter(({ isRead }) => !isRead)
      .length;
  }

  get showCounter(): boolean {
    return this.counter > 0;
  }

  get orderedNotifications(): NotificationI[] {
    return this.notifications.sort((a, b) => {
      const dateDiff = +b.createdAt - +a.createdAt;
      const unreadDiff = +a.isRead - +b.isRead;
      return dateDiff === 0 ? unreadDiff : dateDiff;
    });
  }
}
