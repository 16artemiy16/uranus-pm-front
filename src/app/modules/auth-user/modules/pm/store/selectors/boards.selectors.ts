import { adapterBoards } from '../reducers/boards.reducer';
import { createSelector } from '@ngrx/store';
import { selectBoardsState } from '../index';
const {
  selectAll,
} = adapterBoards.getSelectors();

export const getAll = createSelector(
  selectBoardsState,
  (state) => selectAll(state)
);
