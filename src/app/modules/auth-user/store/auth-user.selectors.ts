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
  (state) => state.notifications
)
