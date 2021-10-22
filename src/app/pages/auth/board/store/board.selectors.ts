import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardStateI, FEATURE_NAME } from './board.reducer';
import { TaskI } from '../../../../layouts/auth/interfaces/task.interface';

export const selectBoardState = createFeatureSelector<BoardStateI>(FEATURE_NAME);

export const selectBoard = createSelector(selectBoardState, ({ board }) => board);
export const selectColumns = createSelector(selectBoardState, ({ columns }) => columns);
export const selectActiveTaskId = createSelector(selectBoardState, ({ selectedTaskId }) => selectedTaskId);
export const selectUsers = createSelector(selectBoardState, ({ users }) => users);

export const selectTaskFilter = createSelector(selectBoardState, ({ taskFilter }) => taskFilter);

export const selectTaskFilterText = createSelector(selectTaskFilter, ({ text }) => text);
export const selectTaskFilterAssigneeId = createSelector(selectTaskFilter, ({ assigneeId }) => assigneeId);

export const selectTaskFilterAssignee = createSelector(
  selectUsers,
  selectTaskFilterAssigneeId,
  (users, assigneeId) => users.find((user) => user._id === assigneeId) || null
)

export const selectBoardName = createSelector(selectBoard, (board) => board?.name || null);

export const selectUserById = (id: string) => createSelector(
  selectUsers,
  (users) => users.find((user) => user._id === id) || null
);

// TODO: think how to refactor using selectTaskById()
export const selectActiveTask = createSelector(
  selectColumns,
  selectActiveTaskId,
  (columns, id) => {
    return !id
      ? null
      : columns
        .reduce((all, { tasks }) => [...all, ...tasks], [] as TaskI[])
        .find((task) => task._id === id) || null
  }
);

// TODO: think how to refactor using selectTaskById()
export const selectTaskAssignee = (taskId: string) => createSelector(
  selectBoardState,
  (state) => {
    const { columns, users } = state;
    const selectedTask = !taskId
      ? null
      : columns
        .reduce((all, { tasks }) => [...all, ...tasks], [] as TaskI[])
        .find((task) => task._id === taskId) || null;
    const userId = selectedTask?.assignee;

    return !userId
      ? null
      : users.find((user) => user._id === userId) || null;
  }
);

export const selectActiveTaskAssignee = createSelector(
  selectUsers,
  selectActiveTask,
  (users, task) => {
    const assigneeId = task?.assignee;
    return !assigneeId
      ? null
      : users.find((user) => user._id === assigneeId) || null
  }
);

export const selectColumnsWithFilteredTasks = createSelector(
  selectColumns,
  selectTaskFilter,
  (columns, { text, assigneeId }) => {
    const filterText = text.trim().toLowerCase();

    // If filter is empty, then just return without filtering
    if (!filterText && !assigneeId) {
      return columns;
    }

    return columns.map((column) => {
      const filteredTasks = column.tasks.filter((task) => {
        const titleFilter = !filterText || task.title.toLowerCase().includes(filterText);
        const assigneeFilter = !assigneeId || task.assignee === assigneeId;
        return titleFilter && assigneeFilter;
      });

      return {
        ...column,
        tasks: filteredTasks
      };
    });
  }
);
