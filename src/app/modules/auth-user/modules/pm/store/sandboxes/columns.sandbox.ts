import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getActiveTask, getAll, getFilter } from '../selectors/columns.selector';
import {
  assignActiveTask,
  assignTask,
  fetchColumns,
  moveTask,
  setActiveTaskId, setTaskFilterAssigneeId,
  setTaskFilterText
} from '../actions/columns.actions';
import { TaskI } from '../../interfaces/task.interface';
import { map, take } from 'rxjs/operators';

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
