import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchBoard,
  fetchBoardSuccess,
  fetchBoardUsers,
  fetchBoardUsersSuccess,
  fetchColumns,
  fetchColumnsSuccess,
  moveTask,
  inviteUsers,
  inviteUsersSuccess,
  removeUsers,
  removeUsersSuccess
} from './board.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { BoardService } from '@services/board.service';
import { BoardI } from '@layouts/auth/interfaces/board.interface';
import { Store } from '@ngrx/store';
import { selectBoard } from './board.selectors';
import { TasksService } from '@services/tasks.service';

@Injectable()
export class BoardEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly boardService: BoardService,
    private readonly store: Store,
    private readonly tasksService: TasksService
  ) {}

  fetchBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchBoard),
      tap(({ boardId }) => this.store.dispatch(fetchColumns({ boardId }))),
      tap(({ boardId }) => this.store.dispatch(fetchBoardUsers({ boardId }))),
      switchMap(({ boardId }) => this.boardService.getBoard<BoardI>(boardId)),
      map((board) => fetchBoardSuccess({ board }))
    );
  })

  fetchColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchColumns),
      switchMap(({ boardId }) => this.boardService.getBoardColumns(boardId)),
      map((columns) => fetchColumnsSuccess({ columns }))
    );
  });

  fetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchBoardUsers),
      switchMap(({ boardId }) => this.boardService.getMembers(boardId)),
      map((users) => fetchBoardUsersSuccess({ users }))
    )
  });

  inviteUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(inviteUsers),
      withLatestFrom(this.store.select(selectBoard)),
      switchMap(([ { users }, board ]) => {
        if (!board) {
          throw Error('The board is not defined!');
        }
        const ids = users.map((user) => user._id);
        return this.boardService.inviteUsers(board._id, ids);
      }),
      map(() => inviteUsersSuccess())
    )
  });

  removeUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeUsers),
      withLatestFrom(this.store.select(selectBoard)),
      switchMap(([{ users }, board ]) => {
        return this.boardService.removeUsers(board!._id, users)
      }),
      map(() => removeUsersSuccess())
    )
  });

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
}
