import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { assign, fetchTask, fetchTaskSuccess, fetchUsers, fetchUsersSuccess } from './task.actions';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { BoardService } from '../../../../../../../services/board.service';
import { Store } from '@ngrx/store';
import { selectTask } from './task.selectors';

@Injectable()
export class TaskEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly boardService: BoardService,
    private readonly store: Store
  ) {}

  fetchTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchTask),
      switchMap(({ id }) => this.boardService.getTaskByCode(id)),
      tap(({ boardId }) => this.store.dispatch(fetchUsers({ boardId }))),
      map((task) => fetchTaskSuccess({ task })),
    );
  });

  fetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchUsers),
      switchMap(({ boardId }) => this.boardService.getMembers(boardId)),
      map((users) => fetchUsersSuccess({ users }))
    )
  });

  assign$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(assign),
      withLatestFrom(this.store.select(selectTask)),
      switchMap(([{ userId }, task]) => {
        if (!task) {
          throw Error('The task does not exist');
        }
        return this.boardService.assignTask(task._id, userId)
      }),
    )
  }, { dispatch: false });
}
