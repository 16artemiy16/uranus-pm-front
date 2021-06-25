import { adapterColumns } from '../reducers/columns.reducer';
import { createSelector } from '@ngrx/store';
import { selectColumnsState } from '../index';
import { TaskI } from '../../interfaces/task.interface';

const {
  selectAll,
} = adapterColumns.getSelectors();

export const getActiveTask = createSelector(
  selectColumnsState,
  (state) => {
    const { activeTaskId } = state;

    return !activeTaskId
      ? null
      : selectAll(state)
          .reduce((tasks, column) => {
            return [ ...tasks, ...column.tasks ];
          }, [] as TaskI[])
          .find((task) => task._id === activeTaskId) || null;
  }
)

export const getFilter = createSelector(
  selectColumnsState,
  (state) => state.filter
);

export const getAll = createSelector(
  selectColumnsState,
  getFilter,
  (state, filter) => {
    const columns = selectAll(state);

    const filterText = filter.text.trim().toLowerCase();

    // If filter is empty, then just return without filtering
    if (!filterText) {
      return columns;
    }

    return columns.map((column) => {
      const filteredTasks = column.tasks.filter((task) => {
        return task.title.toLowerCase().includes(filterText);
      });

      return {
        ...column,
        tasks: filteredTasks
      };
    });
  }
);
