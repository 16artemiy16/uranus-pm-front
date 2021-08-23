import { Component, Input } from '@angular/core';
import { NotificationI } from '../../interfaces/notification.interface';

@Component({
  selector: 'app-notifications-icon',
  templateUrl: './notifications-icon.component.html',
  styleUrls: ['./notifications-icon.component.scss']
})
export class NotificationsIconComponent {
  private readonly GLANCED_TIME_MS = 3000;

  @Input() notifications: NotificationI[] = [{
    _id: '1',
    date: new Date(2019, 11, 5),
    isUnread: true,
    text: `You've been invited to a new board`
  }, {
    _id: '2',
    date: new Date(2019, 11, 6),
    isUnread: true,
    text: 'John Snow moved your task to Done column'
  }, {
    _id: '3',
    date: new Date(2019, 11, 5),
    isUnread: false,
    text: `Hello! This is a test notification. The test is to check how it will work with a huge text. Let's check it out! Here we go!`
  }];

  isOpened: boolean = false;

  constructor() { }

  toggle(): void {
    this.isOpened = !this.isOpened;

    if (this.isOpened) {
      const areUnreadExist = this.notifications.some((item) => item.isUnread);
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
      .filter(({ isUnread }) => isUnread)
      .length;
  }

  get showCounter(): boolean {
    return this.counter > 0;
  }

  get orderedNotifications(): NotificationI[] {
    return this.notifications.sort((a, b) => {
      const dateDiff = +b.date - +a.date;
      const unreadDiff = +b.isUnread - +a.isUnread
      return dateDiff === 0 ? unreadDiff : dateDiff;
    });
  }
}
