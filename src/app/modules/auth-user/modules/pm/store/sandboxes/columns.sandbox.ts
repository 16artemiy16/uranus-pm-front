import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getActiveTask, getAll } from '../selectors/columns.selector';
import { assignTask, fetchColumns, moveTask, setActiveTaskId, setTaskFilterText } from '../actions/columns.actions';
import { TaskI } from '../../interfaces/task.interface';
import { take } from 'rxjs/operators';

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

  assignActiveTask(userId: string | null) {
    // TODO: refactor it, move to store
    this.activeTask$
      .pipe(take(1))
      .subscribe((activeTask) => {
        const taskId = (activeTask as TaskI)._id;
        this.store.dispatch(assignTask({ taskId, userId }));
      })
  }
}
