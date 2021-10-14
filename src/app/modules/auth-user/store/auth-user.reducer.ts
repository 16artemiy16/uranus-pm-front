import { Action, createReducer, on } from '@ngrx/store';
import { LastBoardI } from '../interfaces/last-boards.interface';
import { LastTaskI } from '../interfaces/last-task.interface';
import { fetchLastBoardsSuccess, fetchLastTasksSuccess } from './auth-user.actions';

export const FEATURE_NAME = 'AuthUser';

export interface AuthUserStateI {
  lastBoards: LastBoardI[];
  lastTasks: LastTaskI[];
}

const initialState: AuthUserStateI = {
  lastBoards: [],
  lastTasks: []
};

const authUserReducer = createReducer(
  initialState,
  on(fetchLastBoardsSuccess, (state, { lastBoards }) => ({ ...state, lastBoards })),
  on(fetchLastTasksSuccess, (state, { lastTasks }) => ({ ...state, lastTasks })),
);

export function reducer(state: AuthUserStateI | undefined, action: Action) {
  return authUserReducer(state, action);
}
