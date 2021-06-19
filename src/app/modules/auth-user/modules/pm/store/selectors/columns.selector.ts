import { adapterColumns } from '../reducers/columns.reducer';
import { createSelector } from '@ngrx/store';
import { selectColumnsState } from '../index';

const {
  selectAll,
} = adapterColumns.getSelectors();

export const getAll = createSelector(
  selectColumnsState,
  (state) => selectAll(state)
);
