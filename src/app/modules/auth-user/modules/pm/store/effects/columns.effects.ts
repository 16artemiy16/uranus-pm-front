import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardService } from '../../../../../../services/board.service';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  assignActiveTask,
  assignTaskSuccess,
  fetchColumns,
  fetchColumnsSuccess,
  moveTask
} from '../actions/columns.actions';
import { Store } from '@ngrx/store';
import { getActiveTask } from '../selectors/columns.selector';
import { TasksService } from '../../../../../../services/tasks.service';

@Injectable()
export class ColumnsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly boardService: BoardService,
    private readonly store: Store,
    private readonly tasksService: TasksService
  ) {}

  fetchColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchColumns),
      switchMap(({ boardId }) => {
        return this.boardService.getBoardColumns(boardId);
      }),
      map((columns) => fetchColumnsSuccess({ columns }))
    )
  });

  // TODO: process move task error!
  moveTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(moveTask),
      switchMap(({ taskId, toIndex, columnId }) => {
        return this.tasksService
          .move(taskId, toIndex, columnId)
          .pipe(
            catchError((err) => {
              throw err;
            })
          );
      }),
    );
  }, { dispatch: false });

  assignActiveTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(assignActiveTask),
      withLatestFrom(this.store.select(getActiveTask)),
      switchMap(([{ userId }, task]) => {
        return this.tasksService.assign(task!._id, userId);
      }),
      map(() => assignTaskSuccess())
    );
  });
}
