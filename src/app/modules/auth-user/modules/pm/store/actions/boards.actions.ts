import { createAction, props } from '@ngrx/store';
import { BoardI } from '../../interfaces/board.interface';

export const fetchBoards = createAction('[Boards] Fetch Boards');
export const fetchBoardsSuccess = createAction('[Boards] Fetch Boards Success', props<{ boards: BoardI[] }>());

export const createBoard = createAction('[Boards] Create Board', props<{ name: string, description?: string }>());
export const createBoardSuccess = createAction('[Boards] Create Board Success');
