import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TaskI } from '@layouts/auth/interfaces/task.interface';
import { Title } from '@angular/platform-browser';
import { TaskSandbox } from './store/task.sandbox';
import { BoardService } from '@services/board.service';
import { BoardUserI } from '@shared/models/interfaces/board-user.interface';
import { LastBoardI } from '@layouts/auth/interfaces/last-boards.interface';
import { RoutingService } from '@services/routing.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  readonly boardsLink: string = this.routingService.routes.boards;
  readonly task$: Observable<TaskI | null> = this.taskSandbox.task$;
  readonly board$: Observable<LastBoardI | null> = this.taskSandbox.boardInfo$;
  readonly assignee$: Observable<BoardUserI | null> = this.taskSandbox.assignee$;
  readonly assignUserOptions$: Observable<{ id: string, text: string, img?: string }[]> = this.taskSandbox.assignUserOptions$;

  constructor(
    private readonly taskSandbox: TaskSandbox,
    private readonly boardService: BoardService,
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly routingService: RoutingService
  ) {
    const id = this.route.snapshot.paramMap.get('taskId') as string;
    this.taskSandbox.fetchTask(id);
    this.taskSandbox.task$.pipe(
      filter((task) => !!task),
      take(1)
    ).subscribe((task) => {
      this.title.setTitle(task ? `${task._id} ${task.title}` : 'Loading the task');
      if (task) {
        this.taskSandbox.trackVisitTask(task._id)
      }
    });
  }

  assignTask(userId: string | null): void {
    this.taskSandbox.assign(userId);
  }
}
