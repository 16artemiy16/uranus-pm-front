import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardService } from '../../../../../../services/board.service';
import { map, switchMap } from 'rxjs/operators';
import { fetchBoards, fetchBoardsSuccess } from '../actions/boards.actions';

@Injectable()
export class BoardsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly boardService: BoardService
  ) {}

  fetchBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchBoards),
      switchMap(() => this.boardService.getCurrentUserBoards()),
      map((boards) => fetchBoardsSuccess({ boards }))
    );
  });
}
