import { Action, createReducer, on } from '@ngrx/store';
import { ColumnI } from '../../../../layouts/auth/interfaces/column.interface';
import {
  fetchBoardUsersSuccess,
  fetchBoardSuccess,
  fetchColumnsSuccess,
  moveTask,
  setTask,
  assignActiveTask,
  inviteUsers,
  setTaskFilterText,
  setTaskFilterAssigneeId
} from './board.actions';
import { BoardI } from '../../../../layouts/auth/interfaces/board.interface';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardUserI } from '../../../../shared/models/interfaces/board-user.interface';
import { BoardUserStatusEnum } from '../../../../shared/models/enums/board-user-status.enum';
import { BoardUserRoleEnum } from '../../../../shared/models/enums/board-user-role.enum';

export const FEATURE_NAME = 'Board';

export interface BoardStateI {
  board: BoardI | null;
  columns: ColumnI[],
  users: BoardUserI[];
  selectedTaskId: string | null;
  taskFilter: {
    text: string;
    assigneeId: string | null;
  }
}

export const initialState: BoardStateI = {
  board: null,
  columns: [],
  users: [],
  selectedTaskId: null,
  taskFilter: {
    text: '',
    assigneeId: null,
  }
};

const boardReducer = createReducer(
  initialState,
  on(fetchColumnsSuccess, (state, { columns }) => ({ ...state, columns })),
  on(fetchBoardSuccess, (state, { board }) => ({ ...state, board })),
  on(fetchBoardUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(setTask, (state, { taskId }) => ({ ...state, selectedTaskId: taskId })),
  on(setTaskFilterText, (state, { text }) => ({
    ...state,
    taskFilter: { ...state.taskFilter, text }
  })),
  on(setTaskFilterAssigneeId, (state, { assigneeId }) => ({
    ...state,
    taskFilter: {
      ...state.taskFilter,
      assigneeId: state.taskFilter.assigneeId === assigneeId ? null : assigneeId
    }
  })),
  on(inviteUsers, (state, { users }) => ({
    ...state,
    users: [
      ...state.users,
      ...users.map(({ _id, email, img }) => ({
        _id,
        email,
        img,
        status: BoardUserStatusEnum.Invited,
        role: BoardUserRoleEnum.User
      }))
    ]
  })),
  on(moveTask, (state, { taskId, toIndex, columnId }) => {
    const { columns } = state;

    // TODO: probably move it all to utils
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

      return { ...state, columns: newColumns };
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

    return { ...state, columns: updatedColumns };
  }),
  on(assignActiveTask, (state, { userId }) => {
    const { selectedTaskId, columns } = state;
    const updatedColumns = columns.map((col) => {
      const { tasks } = col;
      const hasTheTask = !!tasks.find((task) => task._id === selectedTaskId);
      return !hasTheTask
        ? col
        : {
          ...col,
          tasks: tasks.map((task) => {
            return task._id === selectedTaskId
              ? { ...task, assignee: userId }
              : task;
          })
        }
    });

    return { ...state, columns: updatedColumns };
  })
);

export function reducer(state: BoardStateI | undefined, action: Action) {
  return boardReducer(state, action);
}
