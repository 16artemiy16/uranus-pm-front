import { Action, createReducer, on } from '@ngrx/store';
import { LastBoardI } from '../interfaces/last-boards.interface';
import { LastTaskI } from '../interfaces/last-task.interface';
import { fetchLastBoardsSuccess, fetchLastTasksSuccess, fetchNotificationsSuccess } from './auth-user.actions';
import { NotificationI } from '../interfaces/notification.interface';

export const FEATURE_NAME = 'AuthUser';

export interface AuthUserStateI {
  lastBoards: LastBoardI[];
  lastTasks: LastTaskI[];
  notifications: NotificationI[]
}

const initialState: AuthUserStateI = {
  lastBoards: [],
  lastTasks: [],
  notifications: []
};

const authUserReducer = createReducer(
  initialState,
  on(fetchLastBoardsSuccess, (state, { lastBoards }) => ({ ...state, lastBoards })),
  on(fetchLastTasksSuccess, (state, { lastTasks }) => ({ ...state, lastTasks })),
  on(fetchNotificationsSuccess, (state, { notifications }) => ({ ...state, notifications }))
);

export function reducer(state: AuthUserStateI | undefined, action: Action) {
  return authUserReducer(state, action);
}
