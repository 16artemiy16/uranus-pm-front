import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BoardI } from '../../interfaces/board.interface';
import { fetchBoardsSuccess, setSelectedBoardId } from '../actions/boards.actions';

export interface BoardsStateI extends EntityState<BoardI>{
  selectedBoardId: string | null;
}

export const adapterBoards: EntityAdapter<BoardI> = createEntityAdapter<BoardI>({
  selectId: (model) => model._id
});

const initialState: BoardsStateI = adapterBoards.getInitialState({
  selectedBoardId: null
});

const boardsReducer = createReducer(
  initialState,
  on(fetchBoardsSuccess, (state, { boards }) => adapterBoards.setAll(boards, state)),
  on(setSelectedBoardId, (state, { boardId }) => ({
    ...state,
    selectedBoardId: boardId
  }))
);

export function reducer(state: BoardsStateI | undefined, action: Action) {
  return boardsReducer(state, action);
}
