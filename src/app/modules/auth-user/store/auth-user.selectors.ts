import { AuthUserStateI } from './auth-user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<AuthUserStateI>('AuthUser');

export const selectLastTasks = createSelector(
  selectAuthState,
  (state) => state.lastTasks
);

export const selectLastBoards = createSelector(
  selectAuthState,
  (state) => state.lastBoards
);

export const selectNotifications = createSelector(
  selectAuthState,
  (state) => {
    return [...state.notifications].sort((a, b) => {
      const dateDiff = +b.createdAt - +a.createdAt;
      const unreadDiff = +a.isRead - +b.isRead;
      return dateDiff === 0 ? unreadDiff : dateDiff;
    });
  }
);

export const selectNotificationsCount = createSelector(
  selectAuthState,
  (state) => {
    return state.notifications
      .filter((item) => !item.isRead)
      .length;
  }
)
