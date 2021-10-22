import { TaskI } from '../../../interfaces/task.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { assign, fetchBoardInfoSuccess, fetchTaskSuccess, fetchUsersSuccess } from './task.actions';
import { BoardUserI } from '../../../../../interfaces/board-user.interface';
import { LastBoardI } from '../../../interfaces/last-boards.interface';

export const FEATURE_NAME = 'Task';

export interface TaskStateI {
  task: TaskI | null;
  users: BoardUserI[];
  board: LastBoardI | null;
}

export const initialState: TaskStateI = {
  task: null,
  users: [],
  board: null
};

const taskReducer = createReducer(
  initialState,
  on(fetchTaskSuccess, (state, { task }) => ({ ...state, task })),
  on(fetchUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(fetchBoardInfoSuccess, (state, { board }) => ({ ...state, board })),
  on(assign, (state, { userId }) => {
    return !state.task
      ? state
      : { ...state, task: { ...state.task, assignee: userId } };
  })
);

export function reducer(state: TaskStateI | undefined, action: Action) {
  return taskReducer(state, action);
}
