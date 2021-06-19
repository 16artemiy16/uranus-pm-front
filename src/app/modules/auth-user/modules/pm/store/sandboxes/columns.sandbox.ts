import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAll } from '../selectors/columns.selector';
import { fetchColumns, moveTask } from '../actions/columns.actions';

@Injectable({
  providedIn: 'root'
})
export class ColumnsSandbox {
  constructor(
    private readonly store: Store
  ) {}

  columns$ = this.store.select(getAll);

  moveTask(taskId: string, toIndex: number, columnId?: string) {
    this.store.dispatch(moveTask({ taskId, toIndex, columnId }));
  }

  fetchColumns(boardId: string) {
    this.store.dispatch(fetchColumns({ boardId }));
  }
}
