import { createAction, props } from '@ngrx/store';
import { ColumnI } from '../../../../layouts/auth/interfaces/column.interface';
import { BoardI } from '../../../../layouts/auth/interfaces/board.interface';
import { BoardUserI, BoardUserToInviteI } from '../../../../shared/models/interfaces/board-user.interface';

export const fetchColumns = createAction('[Board] Fetch Columns', props<{ boardId: string }>());
export const fetchColumnsSuccess = createAction('[Board] Fetch Columns Success', props<{ columns: ColumnI[] }>());

export const fetchBoard = createAction('[Board] Fetch Board', props<{ boardId: string }>());
export const fetchBoardSuccess = createAction('[Board] Fetch Board Success', props<{ board: BoardI }>());

export const setTask = createAction('[Board] Select Task', props<{ taskId: string | null }>());

export const setTaskFilterText = createAction('[Board] Set Task Filter Text', props<{ text: string }>());
export const setTaskFilterAssigneeId = createAction('[Board] Set Task Filter Assignee Id', props<{ assigneeId: string }>());

export const moveTask = createAction(
  '[Board] Move Task',
  props<{ taskId: string, toIndex: number, columnId?: string }>()
);

export const fetchBoardUsers = createAction('[Board] Fetch Board Users', props<{ boardId: string }>());
export const fetchBoardUsersSuccess = createAction(
  '[Board] Fetch Board Users Success',
  props<{ users: BoardUserI[] }>()
);

export const assignActiveTask = createAction('[Board] Assign Active Task', props<{ userId: string | null }>());

export const inviteUsers = createAction('[Board] Invite Users', props<{ users: BoardUserToInviteI[] }>());
export const inviteUsersSuccess = createAction('[Board] Invite Users Success');

export const removeUsers = createAction('[Board] Remove Users', props<{ users: string[] }>());
export const removeUsersSuccess = createAction('[Board] Remove Users Success');

