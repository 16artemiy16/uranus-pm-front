import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAssignee, selectBoardInfo, selectTask, selectUsersOptions } from './task.selectors';
import { Observable } from 'rxjs';
import { TaskI } from '@layouts/auth/interfaces/task.interface';
import { assign, fetchTask } from './task.actions';
import { AnalyticsService } from '@services/analytics.service';
import { take } from 'rxjs/operators';
import { BoardUserI } from '@shared/models/interfaces/board-user.interface';
import { LastBoardI } from '@layouts/auth/interfaces/last-boards.interface';

@Injectable({ providedIn: 'root' })
export class TaskSandbox {
  constructor(
    private readonly store: Store,
    private readonly analyticsService: AnalyticsService
  ) {}

  task$: Observable<TaskI | null> = this.store.select(selectTask);
  assignee$: Observable<BoardUserI | null> = this.store.select(selectAssignee);
  assignUserOptions$: Observable<{ id: string, text: string, img?: string }[]> = this.store.select(selectUsersOptions);
  boardInfo$: Observable<LastBoardI | null> = this.store.select(selectBoardInfo);

  fetchTask(id: string) {
    this.store.dispatch(fetchTask({ id }));
  }

  trackVisitTask(id: string) {
    this.analyticsService.traceUserVisitTask(id).pipe(take(1)).subscribe();
  }

  assign(userId: string | null) {
    this.store.dispatch(assign({ userId }));
  }
}
