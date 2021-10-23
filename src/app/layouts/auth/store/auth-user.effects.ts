import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchLastBoards,
  fetchLastBoardsSuccess,
  fetchLastTasksSuccess,
  fetchNotifications, fetchNotificationsSuccess
} from './auth-user.actions';
import { map, switchMap } from 'rxjs/operators';
import { AnalyticsService } from '@services/analytics.service';
import { UserService } from '@services/user.service';

@Injectable()
export class AuthUserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly analyticsService: AnalyticsService,
    private readonly userServise: UserService
  ) {}

  fetchLastBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchLastBoards),
      switchMap(() => this.analyticsService.getUserFavouriteBoards()),
      map((lastBoards) => fetchLastBoardsSuccess({ lastBoards }))
    );
  });

  fetchLastTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchLastBoards),
      switchMap(() => this.analyticsService.getUserFavouriteTasks()),
      map((lastTasks) => fetchLastTasksSuccess({ lastTasks }))
    );
  });

  fetchNotifications$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchNotifications),
      switchMap(() => this.userServise.getMyNotifications()),
      map((notifications) => fetchNotificationsSuccess({ notifications }))
    );
  })
}
