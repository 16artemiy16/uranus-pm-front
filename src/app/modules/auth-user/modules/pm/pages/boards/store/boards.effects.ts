import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { createBoard, fetchBoards, fetchBoardsSuccess, toggleFavouriteBoard } from './boards.actions';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { BoardService } from '../../../../../../../services/board.service';
import { TranslocoService } from '@ngneat/transloco';
import { SnackService } from '../../../../../../common/snack/snack.service';

@Injectable()
export class BoardsEffects {
  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly boardService: BoardService,
    private readonly transloco: TranslocoService,
    private readonly snack: SnackService
  ) {}

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

  toggleFavouriteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(toggleFavouriteBoard),
      mergeMap(({ boardId }) => this.boardService.toggleFavouriteBoard(boardId)),
    )
  }, { dispatch: false });
}
