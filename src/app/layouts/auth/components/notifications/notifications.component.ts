import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationI } from '../../interfaces/notification.interface';
import { UserService } from '../../../../services/user.service';
import { AuthUserSandbox } from '../../store/auth-user.sandbox';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent {
  notifications$: Observable<NotificationI[]> = this.authSandbox.notifications$;
  notificationsCount$: Observable<number> = this.authSandbox.notificationsCount$;
  showNotificationsCount$: Observable<boolean> = this.notificationsCount$.pipe(
    map((count) => count > 0)
  );

  isOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly userService: UserService,
    private readonly authSandbox: AuthUserSandbox
  ) {
    this.authSandbox.fetchNotifications();
  }

  toggle(): void {
    const newIsOpened = !this.isOpened$.value;
    this.isOpened$.next(newIsOpened);
  }
}
