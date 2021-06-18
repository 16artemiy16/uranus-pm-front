import { createAction, props } from '@ngrx/store';
import { BoardI } from '../../interfaces/board.interface';

export const fetchBoards = createAction('[Boards] Fetch Boards');
export const fetchBoardsSuccess = createAction('[Boards] Fetch Boards Success', props<{ boards: BoardI[] }>());

// TODO implement create boards functionality
// export const createBoard = createAction('[Boards] Create Board');
// export const createBoardSuccess = createAction('[Boards] Create Board Success');
// export const createBoardError = createAction('[Boards] Create Board Error');
