import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAll } from '../selectors/boards.selectors';
import { fetchBoards } from '../actions/boards.actions';

@Injectable({
  providedIn: 'root'
})
export class BoardsSandbox {
  constructor(
    private readonly store: Store
  ) {}

  boards$ = this.store.select(getAll);

  fetchBoards() {
    this.store.dispatch(fetchBoards());
  }
}
