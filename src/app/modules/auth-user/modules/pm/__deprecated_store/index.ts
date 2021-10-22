import * as fromBoards from './reducers/boards.reducer';
import * as formColumns from './reducers/columns.reducer';
import {  createFeatureSelector, createSelector } from '@ngrx/store';

export const FEATURE_NAME = 'PMModule';

export interface PMState {
  boards: fromBoards.BoardsStateI,
  columns: formColumns.ColumnsStateI
}

export const reducers = {
  boards: fromBoards.reducer,
  columns: formColumns.reducer
};

export const selectPMState = createFeatureSelector<PMState>(FEATURE_NAME);


export const selectBoardsState = createSelector(
  selectPMState,
  (state) => state.boards
);

export const selectColumnsState = createSelector(
  selectPMState,
  (state) => state.columns
);
