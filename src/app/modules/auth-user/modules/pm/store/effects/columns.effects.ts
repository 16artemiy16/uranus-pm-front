import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardService } from '../../../../../../services/board.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { assignTask, assignTaskSuccess, fetchColumns, fetchColumnsSuccess, moveTask } from '../actions/columns.actions';

@Injectable()
export class ColumnsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly boardService: BoardService
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
        return this.boardService
          .moveTask(taskId, toIndex, columnId)
          .pipe(
            catchError((err) => {
              throw err;
            })
          );
      }),
    );
  }, { dispatch: false });

  assignToTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(assignTask),
      switchMap(({ taskId, userId }) => {
        return this.boardService.assignTask(taskId, userId)
      }),
      map(() => assignTaskSuccess())
    )
  })
}
