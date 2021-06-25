import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAll, getSelected } from '../selectors/boards.selectors';
import { createBoard, fetchBoards, setSelectedBoardId } from '../actions/boards.actions';

@Injectable({
  providedIn: 'root'
})
export class BoardsSandbox {
  constructor(
    private readonly store: Store
  ) {}

  boards$ = this.store.select(getAll);
  selectedBoard$ = this.store.select(getSelected);

  fetchBoards() {
    this.store.dispatch(fetchBoards());
  }

  createBoard(dto: { name: string, description?: string }) {
    this.store.dispatch(createBoard(dto));
  }

  setSelectedBoardId(boardId: string) {
    this.store.dispatch(setSelectedBoardId({ boardId }));
  }
}
