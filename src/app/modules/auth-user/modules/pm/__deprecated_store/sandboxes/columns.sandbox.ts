import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getActiveTask, getAll, getFilter, getTaskByCode, getTaskById } from '../selectors/columns.selector';
import {
  assignActiveTask,
  assignTask,
  fetchColumns,
  moveTask,
  setActiveTaskId, setTaskFilterAssigneeId,
  setTaskFilterText
} from '../actions/columns.actions';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TaskI } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ColumnsSandbox {
  constructor(
    private readonly store: Store
  ) {}

  columns$ = this.store.select(getAll);
  activeTask$ = this.store.select(getActiveTask);
  tasksFilter$ = this.store.select(getFilter);
  tasksFilterAssignee$ = this.tasksFilter$.pipe(
    map(({ assigneeId }) => assigneeId)
  );

  getTaskById(id: string): Observable<TaskI | null> {
    return this.store.select(getTaskById(id));
  }

  getTaskByCode(code: string): Observable<TaskI | null> {
    return this.store.select(getTaskByCode(code));
  }

  moveTask(taskId: string, toIndex: number, columnId?: string) {
    this.store.dispatch(moveTask({ taskId, toIndex, columnId }));
  }

  fetchColumns(boardId: string) {
    this.store.dispatch(fetchColumns({ boardId }));
  }

  setTaskFilterText(text: string) {
    this.store.dispatch(setTaskFilterText({ text }));
  }

  setTaskFilterAssigneeId(assigneeId: string) {
    this.store.dispatch(setTaskFilterAssigneeId({ assigneeId }));
  }

  setActiveTask(taskId: string | null) {
    this.store.dispatch(setActiveTaskId({ taskId }));
  }

  assignActiveTask(userId: string | null) {
    this.store.dispatch(assignActiveTask({ userId }))
  }
}
