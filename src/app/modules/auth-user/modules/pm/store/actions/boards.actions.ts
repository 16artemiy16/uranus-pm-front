import { createAction, props } from '@ngrx/store';
import { BoardI } from '../../interfaces/board.interface';
import { BoardUserI, BoardUserToInviteI } from '../../../../../../interfaces/board-user.interface';

export const fetchBoards = createAction('[Boards] Fetch Boards');
export const fetchBoardsSuccess = createAction('[Boards] Fetch Boards Success', props<{ boards: BoardI[] }>());

export const createBoard = createAction('[Boards] Create Board', props<{ name: string, key: string, description?: string }>());
export const createBoardSuccess = createAction('[Boards] Create Board Success');

export const setSelectedBoardId = createAction('[Boards] Set Selected Board Id', props<{ boardId: string }>());

export const fetchBoardMembersSuccess = createAction(
  '[Boards] Fetch Board Members Success',
  props<{ users: BoardUserI[] }>()
);

export const inviteUsers = createAction('[Boards] Invite Users', props<{ users: BoardUserToInviteI[] }>());
export const inviteUsersSuccess = createAction('[Boards] Invite Users Success');

export const removeUsers = createAction('[Boards] Remove Users', props<{ users: string[] }>());
export const removeUsersSuccess = createAction('[Boards] Remove Users Success');
