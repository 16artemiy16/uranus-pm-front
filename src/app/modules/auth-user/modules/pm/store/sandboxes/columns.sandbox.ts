import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getActiveTask, getAll } from '../selectors/columns.selector';
import { fetchColumns, moveTask, setActiveTaskId, setTaskFilterText } from '../actions/columns.actions';

@Injectable({
  providedIn: 'root'
})
export class ColumnsSandbox {
  constructor(
    private readonly store: Store
  ) {}

  columns$ = this.store.select(getAll);
  activeTask$ = this.store.select(getActiveTask);

  moveTask(taskId: string, toIndex: number, columnId?: string) {
    this.store.dispatch(moveTask({ taskId, toIndex, columnId }));
  }

  fetchColumns(boardId: string) {
    this.store.dispatch(fetchColumns({ boardId }));
  }

  setTaskFilterText(text: string) {
    this.store.dispatch(setTaskFilterText({ text }));
  }

  setActiveTask(taskId: string | null) {
    this.store.dispatch(setActiveTaskId({ taskId }));
  }
}
