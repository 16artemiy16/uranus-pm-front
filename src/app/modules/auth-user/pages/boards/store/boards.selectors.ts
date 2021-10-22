import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, BoardsStateI, FEATURE_NAME } from './boards.reducer';

const {
  selectAll,
} = adapter.getSelectors();

export const selectBoardsState = createFeatureSelector<BoardsStateI>(FEATURE_NAME);

export const selectBoards = createSelector(selectBoardsState, selectAll);
