import { adapterBoards } from '../reducers/boards.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapterBoards.getSelectors();

export const selectBoardsState = createFeatureSelector<any>('boards');


export const getAll = createSelector(
  selectBoardsState,
  selectAll
);
