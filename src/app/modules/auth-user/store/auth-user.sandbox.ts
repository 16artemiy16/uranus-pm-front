import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthUserStateI } from './auth-user.reducer';
import { selectLastBoards, selectLastTasks } from './auth-user.selectors';
import { fetchLastBoards, fetchLastTasks } from './auth-user.actions';
import { Observable } from 'rxjs';
import { LastTaskI } from '../interfaces/last-task.interface';
import { LastBoardI } from '../interfaces/last-boards.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthUserSandbox {
  constructor(
    private readonly store: Store<AuthUserStateI>
  ) {}

  fetchLastBoards() {
    this.store.dispatch(fetchLastBoards());
  }

  fetchLastTasks() {
    this.store.dispatch(fetchLastTasks());
  }

  lastTasks$: Observable<LastTaskI[]> = this.store.select(selectLastTasks);
  lastBoards$: Observable<LastBoardI[]> = this.store.select(selectLastBoards);
}
