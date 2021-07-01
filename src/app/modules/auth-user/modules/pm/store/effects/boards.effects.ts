import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardService } from '../../../../../../services/board.service';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  createBoard,
  fetchBoardMembersSuccess,
  fetchBoards,
  fetchBoardsSuccess,
  setSelectedBoardId
} from '../actions/boards.actions';
import { SnackService } from '../../../../../common/snack/snack.service';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class BoardsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly boardService: BoardService,
    private readonly snack: SnackService,
    private readonly transloco: TranslocoService,
  ) {}

  setSelectedBoardId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setSelectedBoardId),
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
      switchMap(({ name, description }) => {
        return this.boardService.create({ name, description });
      }),
      tap(() => {
        const msg = this.transloco.translate('auth.BoardCreated');
        this.snack.success(msg);
      }),
      map(() => fetchBoards())
    );
  })
}
