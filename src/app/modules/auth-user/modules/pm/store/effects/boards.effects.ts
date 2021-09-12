import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardService } from '../../../../../../services/board.service';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  createBoard,
  fetchBoardMembersSuccess,
  fetchBoards,
  fetchBoardsSuccess, inviteUsers, inviteUsersSuccess, removeUsers, removeUsersSuccess,
  setSelectedBoardId
} from '../actions/boards.actions';
import { SnackService } from '../../../../../common/snack/snack.service';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { getSelected } from '../selectors/boards.selectors';
import { AnalyticsService } from '../../../../../../services/analytics.service';

@Injectable()
export class BoardsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly boardService: BoardService,
    private readonly snack: SnackService,
    private readonly transloco: TranslocoService,
    private readonly store: Store,
    private readonly analyticsService: AnalyticsService
  ) {}

  setSelectedBoardId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setSelectedBoardId),
      tap(({ boardId }) => {
        this.analyticsService.traceUserVisitBoard(boardId).subscribe()
      }),
      switchMap(({ boardId }) => {
        return this.boardService.getMembers(boardId);
      }),
      map((users) => fetchBoardMembersSuccess({ users }))
    );
  });

  fetchBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchBoards),
      switchMap(() => this.boardService.getCurrentUserBoards()),
      map((boards) => fetchBoardsSuccess({ boards }))
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createBoard),
      switchMap(({ name, key, description }) => {
        return this.boardService.create({ name, key, description });
      }),
      tap(() => {
        const msg = this.transloco.translate('auth.BoardCreated');
        this.snack.success(msg);
      }),
      map(() => fetchBoards())
    );
  });

  inviteUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(inviteUsers),
      withLatestFrom(this.store.select(getSelected)),
      switchMap(([ { users }, selectedBoard ]) => {
        const ids = users.map((user) => user._id);
        return this.boardService.inviteUsers(selectedBoard!._id, ids);
      }),
      map(() => inviteUsersSuccess())
    )
  });

  removeUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeUsers),
      withLatestFrom(this.store.select(getSelected)),
      switchMap(([{ users }, selectedBoard ]) => {
        return this.boardService.removeUsers(selectedBoard!._id, users)
      }),
      map(() => removeUsersSuccess())
    )
  })
}
