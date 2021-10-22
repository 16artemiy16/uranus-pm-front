import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthUserStateI } from './auth-user.reducer';
import {
  selectLastBoards,
  selectLastTasks,
  selectNotifications,
  selectNotificationsCount
} from './auth-user.selectors';
import { fetchLastBoards, fetchLastTasks, fetchNotifications } from './auth-user.actions';
import { Observable } from 'rxjs';
import { LastTaskI } from '../interfaces/last-task.interface';
import { LastBoardI } from '../interfaces/last-boards.interface';
import { NotificationI } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthUserSandbox {
  constructor(
    private readonly store: Store<AuthUserStateI>
  ) {}

  lastTasks$: Observable<LastTaskI[]> = this.store.select(selectLastTasks);
  lastBoards$: Observable<LastBoardI[]> = this.store.select(selectLastBoards);
  notifications$: Observable<NotificationI[]> = this.store.select(selectNotifications);
  notificationsCount$: Observable<number> = this.store.select(selectNotificationsCount);

  fetchLastBoards() {
    this.store.dispatch(fetchLastBoards());
  }

  fetchLastTasks() {
    this.store.dispatch(fetchLastTasks());
  }

  fetchNotifications() {
    this.store.dispatch(fetchNotifications());
  }
}
