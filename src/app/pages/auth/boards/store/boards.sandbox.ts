import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchBoards, createBoard, toggleFavouriteBoard } from './boards.actions';
import { Observable } from 'rxjs';
import { BoardI } from '../../../../layouts/auth/interfaces/board.interface';
import { selectBoards } from './boards.selectors';

@Injectable({ providedIn: 'root' })
export class BoardsSandbox {
  boards$: Observable<BoardI[]> = this.store.select(selectBoards);

  constructor(
    private readonly store: Store
  ) {}

  fetchBoards() {
    this.store.dispatch(fetchBoards());
  }

  createBoard(dto: { name: string, key: string, description?: string }) {
    this.store.dispatch(createBoard(dto));
  }

  toggleFavouriteBoard(boardId: string) {
    this.store.dispatch(toggleFavouriteBoard({ boardId }));
  }

  // TODO: refactor to store
  cacheBoardsView(value: 'list' | 'view'): void {
    localStorage.setItem('boards-view', value);
  }

  // TODO: refactor to store
  get cachedBoardsView(): 'list' | 'grid' {
    const lsValue = localStorage.getItem('boards-view') || 'list';
    return ['list', 'grid'].includes(lsValue)
      ? lsValue as 'list' | 'grid'
      : 'list';
  }
}
