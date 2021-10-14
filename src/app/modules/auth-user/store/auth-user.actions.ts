import { createAction, props } from '@ngrx/store';
import { LastBoardI } from '../interfaces/last-boards.interface';
import { LastTaskI } from '../interfaces/last-task.interface';
import { NotificationI } from '../interfaces/notification.interface';

export const fetchLastBoards = createAction('[AuthUser] Fetch Last Boards');
export const fetchLastBoardsSuccess = createAction(
  '[AuthUser] Fetch Last Boards Success',
  props<{ lastBoards: LastBoardI[] }>()
);

export const fetchLastTasks = createAction('[AuthUser] Fetch Last Tasks');
export const fetchLastTasksSuccess = createAction(
  '[AuthUser] Fetch Last Tasks Success',
  props<{ lastTasks: LastTaskI[] }>()
);

export const fetchNotifications = createAction('[AuthUser] Fetch Notifications');
export const fetchNotificationsSuccess = createAction(
  '[AuthUser] Fetch Notifications Success',
  props<{ notifications: NotificationI[] }>()
);
