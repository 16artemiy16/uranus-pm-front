import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BoardI } from '../../interfaces/board.interface';
import { fetchBoardsSuccess } from '../actions/boards.actions';

export interface BoardsStateI extends EntityState<BoardI>{}

export const adapterBoards: EntityAdapter<BoardI> = createEntityAdapter<BoardI>({
  selectId: (model) => model._id
});

const initialState: BoardsStateI = adapterBoards.getInitialState({});

const boardsReducer = createReducer(
  initialState,
  on(fetchBoardsSuccess, (state, { boards }) => adapterBoards.setAll(boards, state))
);

export function reducer(state: BoardsStateI | undefined, action: Action) {
  return boardsReducer(state, action);
}
