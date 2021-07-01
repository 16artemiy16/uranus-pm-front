import { createAction, props } from '@ngrx/store';
import { BoardI } from '../../interfaces/board.interface';
import { BoardUserI } from '../../../../../../interfaces/board-user.interface';

export const fetchBoards = createAction('[Boards] Fetch Boards');
export const fetchBoardsSuccess = createAction('[Boards] Fetch Boards Success', props<{ boards: BoardI[] }>());

export const createBoard = createAction('[Boards] Create Board', props<{ name: string, description?: string }>());
export const createBoardSuccess = createAction('[Boards] Create Board Success');

export const setSelectedBoardId = createAction('[Boards] Set Selected Board Id', props<{ boardId: string }>());

export const fetchBoardMembersSuccess = createAction(
  '[Boards] Fetch Board Members Success',
  props<{ users: BoardUserI[] }>()
);
