import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, pluck, share, switchMap, take, tap } from 'rxjs/operators';
import { ColumnsSandbox } from '../../store/sandboxes/columns.sandbox';
import { Observable, of } from 'rxjs';
import { TaskI } from '../../interfaces/task.interface';
import { BoardsSandbox } from '../../store/sandboxes/boards.sandbox';
import { BoardUserI } from '../../../../../../interfaces/board-user.interface';
import { AnalyticsService } from '../../../../../../services/analytics.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  task$: Observable<TaskI> = this.activatedRoute.data.pipe(pluck('task'));

  assignee$: Observable<BoardUserI | null> = this.task$.pipe(
    switchMap((task) => {
      return task?.assignee ? this.boardsSandbox.getMemberById(task.assignee) : of(null);
    }),
  );

  boardName$: Observable<string | null> = this.task$.pipe(
    switchMap((task) => task
      ? this.boardsSandbox.getBoardById(task.boardId)
      : of(null)
    ),
    map((board) => board?.name || '')
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly columnSandbox: ColumnsSandbox,
    private readonly boardsSandbox: BoardsSandbox,
    private readonly analyticsService: AnalyticsService
  ) {
    this.trackVisitTask();
  }

  private trackVisitTask() {
    this.task$
      .pipe(
        take(1),
        switchMap(({ _id }) => this.analyticsService.traceUserVisitTask(_id))
      ).subscribe()
  }
}
