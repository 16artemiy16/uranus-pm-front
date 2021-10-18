import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_NAME, TaskStateI } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskStateI>(FEATURE_NAME);

export const selectTask = createSelector(selectTaskState, ({ task }) => task);
export const selectUsers = createSelector(selectTaskState, ({ users }) => users);

export const selectAssignee = createSelector(
  selectTaskState,
  ({ task, users }) => {
    const assigneeId = task?.assignee;

    return !assigneeId
      ? null
      : users.find((user) => user._id === assigneeId) || null
  }
);

export const selectUsersOptions = createSelector(
  selectUsers,
  (users) => users.map(({ _id: id, email: text, img }) => ({ id, text, img }))
);
