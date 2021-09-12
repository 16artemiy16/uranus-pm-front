import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAll, getMemberById, getMembers, getSelected, getMembersOrderedByEmailStr, getBoardById } from '../selectors/boards.selectors';
import { createBoard, fetchBoards, inviteUsers, removeUsers, setSelectedBoardId } from '../actions/boards.actions';
import { Observable } from 'rxjs';
import { BoardUserI, BoardUserToInviteI } from '../../../../../../interfaces/board-user.interface';
import { BoardI } from '../../interfaces/board.interface';

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

  getBoardById(id: string): Observable<BoardI | null> {
    return this.store.select(getBoardById(id));
  }

  getMemberById(id: string): Observable<BoardUserI | null> {
    return this.store.select(getMemberById(id));
  }

  getMembersOrderedByEmailStr(emailStr: string): Observable<BoardUserI[]> {
    return this.store.select(getMembersOrderedByEmailStr(emailStr));
  }

  fetchBoards() {
    this.store.dispatch(fetchBoards());
  }

  createBoard(dto: { name: string, key: string, description?: string }) {
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

  cacheBoardsView(value: 'list' | 'view'): void {
    localStorage.setItem('boards-view', value);
  }

  get cachedBoardsView(): 'list' | 'grid' {
    const lsValue = localStorage.getItem('boards-view') || 'list';
    return ['list', 'grid'].includes(lsValue)
      ? lsValue as 'list' | 'grid'
      : 'list';
  }
}
