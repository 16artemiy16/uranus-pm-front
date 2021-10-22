import { Store } from '@ngrx/store';
import {
  fetchBoard,
  setTaskFilterText,
  setTaskFilterAssigneeId,
  setTask,
  moveTask,
  assignActiveTask,
  inviteUsers,
  removeUsers
} from './board.actions';
import {
  selectActiveTask, selectActiveTaskAssignee,
  selectBoard, selectBoardName,
  selectColumnsWithFilteredTasks, selectTaskAssignee, selectTaskFilterAssignee,
  selectTaskFilterAssigneeId,
  selectTaskFilterText, selectUserById, selectUsers
} from './board.selectors';
import { Observable } from 'rxjs';
import { BoardI } from '../../../interfaces/board.interface';
import { ColumnI } from '../../../interfaces/column.interface';
import { TaskI } from '../../../interfaces/task.interface';
import { BoardUserI, BoardUserToInviteI } from '../../../../../../../interfaces/board-user.interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BoardSandbox {
  board$: Observable<BoardI | null> = this.store.select(selectBoard);
  boardName$: Observable<string | null> = this.store.select(selectBoardName);
  columns$: Observable<ColumnI[]> = this.store.select(selectColumnsWithFilteredTasks);
  taskFilterText$: Observable<string> = this.store.select(selectTaskFilterText);
  taskFilterAssigneeId$: Observable<string | null> = this.store.select(selectTaskFilterAssigneeId);
  taskFilterAssignee$: Observable<BoardUserI | null> = this.store.select(selectTaskFilterAssignee);
  activeTask$: Observable<TaskI | null> = this.store.select(selectActiveTask);
  activeTaskAssignee$: Observable<BoardUserI | null> = this.store.select(selectActiveTaskAssignee);
  users$: Observable<BoardUserI[]> = this.store.select(selectUsers);

  constructor(
    private readonly store: Store
  ) {}

  getUserById$(id: string): Observable<BoardUserI | null> {
    return this.store.select(selectUserById(id));
  }

  getTaskAssignee$(taskId: string): Observable<BoardUserI | null> {
    return this.store.select(selectTaskAssignee(taskId));
  }

  fetchBoard(boardId: string) {
    this.store.dispatch(fetchBoard({ boardId }));
  }

  setTask(taskId: string | null)  {
    this.store.dispatch(setTask({ taskId }));
  }

  resetTask() {
    this.store.dispatch(setTask({ taskId: null }));
  }

  setTaskFilterText(text: string) {
    this.store.dispatch(setTaskFilterText({ text }));
  }

  resetTaskFilterText() {
    this.store.dispatch(setTaskFilterText({ text: '' }));
  }

  setTaskFilterAssigneeId(assigneeId: string) {
    this.store.dispatch(setTaskFilterAssigneeId({ assigneeId }))
  }

  moveTask(taskId: string, toIndex: number, columnId?: string) {
    this.store.dispatch(moveTask({ taskId, toIndex, columnId }));
  }

  assignActiveTask(userId: string | null) {
    this.store.dispatch(assignActiveTask({ userId }));
  }

  inviteUsers(users: BoardUserToInviteI[]) {
    this.store.dispatch(inviteUsers({ users }));
  }

  removeUsers(users: string[]) {
    this.store.dispatch(removeUsers({ users }));
  }
}
