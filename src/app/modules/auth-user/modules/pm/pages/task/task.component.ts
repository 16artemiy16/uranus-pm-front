import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
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
  task$: Observable<TaskI | null> = this.activatedRoute.paramMap
    .pipe(
      tap((params) => {
        // TODO: duplicated code! the same as in Board Page
        const boardId = params.get('id');
        if (boardId) {
          this.boardsSandbox.fetchBoards();
          this.boardsSandbox.setSelectedBoardId(boardId);
          this.columnSandbox.fetchColumns(boardId);
        }
      }),
      map((params) => params.get('taskId')),
      switchMap((taskId) => {
        return taskId ?
          this.columnSandbox.getTaskById(taskId).pipe(
            tap(() => this.analyticsService.traceUserVisitTask(taskId).subscribe())
          )
          : of(null);
      }),
    );

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

  }
}
