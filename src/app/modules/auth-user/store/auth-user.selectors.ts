import { AuthUserStateI } from './auth-user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<AuthUserStateI>('AuthUser');

export const selectLastTasks = createSelector(
  selectAuthState,
  (state: AuthUserStateI) => state.lastTasks
);

export const selectLastBoards = createSelector(
  selectAuthState,
  (state: AuthUserStateI) => state.lastBoards
);
