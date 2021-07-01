import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BoardI } from '../../interfaces/board.interface';
import { fetchBoardMembersSuccess, fetchBoardsSuccess, setSelectedBoardId } from '../actions/boards.actions';
import { BoardUserI } from '../../../../../../interfaces/board-user.interface';

export interface BoardsStateI extends EntityState<BoardI>{
  selectedBoardId: string | null;
  users: BoardUserI[];
}

export const adapterBoards: EntityAdapter<BoardI> = createEntityAdapter<BoardI>({
  selectId: (model) => model._id
});

const initialState: BoardsStateI = adapterBoards.getInitialState({
  selectedBoardId: null,
  users: []
});

const boardsReducer = createReducer(
  initialState,
  on(fetchBoardsSuccess, (state, { boards }) => adapterBoards.setAll(boards, state)),
  on(setSelectedBoardId, (state, { boardId }) => ({
    ...state,
    selectedBoardId: boardId
  })),
  on(fetchBoardMembersSuccess, (state, { users }) => ({
    ...state,
    users
  }))
);

export function reducer(state: BoardsStateI | undefined, action: Action) {
  return boardsReducer(state, action);
}
