import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ColumnI } from '../../interfaces/column.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  fetchColumns,
  fetchColumnsSuccess,
  moveTask,
  setActiveTaskId,
  setTaskFilterText,
  assignActiveTask
} from '../actions/columns.actions';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface ColumnsStateI extends EntityState<ColumnI> {
  filter: {
    text: string;
  },
  activeTaskId: string | null;
}

export const adapterColumns: EntityAdapter<ColumnI> = createEntityAdapter<ColumnI>({
  selectId: (model) => model._id,
  sortComparer: (a, b) => a.order - b.order
});

const initialState: ColumnsStateI = adapterColumns.getInitialState({
  filter: {
    text: ''
  },
  activeTaskId: null
});

const {
  selectAll,
} = adapterColumns.getSelectors();

const columnsReducer = createReducer(
  initialState,
  on(fetchColumns, (state, { boardId }) => ({
    ...state,
    activeBoardId: boardId
  })),
  on(fetchColumnsSuccess, (state, { columns }) => adapterColumns.setAll(columns, state)),
  on(setActiveTaskId, (state, { taskId }) => ({
    ...state,
    activeTaskId: taskId
  })),
  on(moveTask, (state, { taskId, toIndex, columnId }) => {
    const columns = selectAll(state);

    if (!columnId) {
      const newColumns = columns
        .map((col) => {
          const colTasks = col.tasks;
          const taskIndex = colTasks
            .map(({ _id }) => _id)
            .indexOf(taskId);

          if (taskIndex === -1) {
            return col;
          }
          const copiedTasks = [...colTasks];
          moveItemInArray(copiedTasks, taskIndex, toIndex);

          return { ...col, tasks: copiedTasks };
        });
      return adapterColumns.setAll(newColumns, state);
    }

    const prevCol = columns.find((col) => {
      return col.tasks
        .map(({ _id }) => _id)
        .includes(taskId);
    }) as ColumnI;
    const newCol = columns.find((col) => col._id === columnId);

    const prevIndex = prevCol.tasks.findIndex((task) => task._id === taskId);

    const prevColCopy = JSON.parse(JSON.stringify(prevCol));
    const newColCopy = JSON.parse(JSON.stringify(newCol));

    transferArrayItem(
      prevColCopy.tasks,
      newColCopy.tasks,
      prevIndex,
      toIndex
    );

    const updatedColumns = columns.map((col) => {
      if (col._id === prevColCopy._id) {
        return prevColCopy;
      }
      if (col._id === newColCopy._id) {
        return newColCopy;
      }
      return col;
    });

    return adapterColumns.setAll(updatedColumns, state);
  }),
  on(setTaskFilterText, (state, { text }) => ({
    ...state,
    filter: { ...state.filter, text }
  })),
  on(assignActiveTask, (state, { userId }) => {
    const taskId = state.activeTaskId;
    const columns = selectAll(state);
    const updatedColumns = columns.map((col) => {
      const { tasks } = col;
      const hasTheTask = !!tasks.find((task) => task._id === taskId);
      return !hasTheTask
        ? col
        : {
          ...col,
          tasks: tasks.map((task) => {
            return task._id === taskId
              ? { ...task, assignee: userId }
              : task;
          })
        }
    });

    return adapterColumns.setAll(updatedColumns, state);
  })
);

export function reducer(state: ColumnsStateI | undefined, action: Action) {
  return columnsReducer(state, action);
}
