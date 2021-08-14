import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAll, getMembers, getSelected } from '../selectors/boards.selectors';
import { createBoard, fetchBoards, inviteUsers, removeUsers, setSelectedBoardId } from '../actions/boards.actions';
import { Observable } from 'rxjs';
import { BoardUserI, BoardUserToInviteI } from '../../../../../../interfaces/board-user.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardsSandbox {
  constructor(
    private readonly store: Store
  ) {}

  boards$ = this.store.select(getAll);
  selectedBoard$ = this.store.select(getSelected);
  boardMembers$: Observable<BoardUserI[]> = this.store.select(getMembers);

  fetchBoards() {
    this.store.dispatch(fetchBoards());
  }

  createBoard(dto: { name: string, description?: string }) {
    this.store.dispatch(createBoard(dto));
  }

  setSelectedBoardId(boardId: string) {
    this.store.dispatch(setSelectedBoardId({ boardId }));
  }

  inviteUsers(users: BoardUserToInviteI[]) {
    this.store.dispatch(inviteUsers({ users }));
  }

  removeUsers(users: string[]) {
    this.store.dispatch(removeUsers({ users }));
  }
}
