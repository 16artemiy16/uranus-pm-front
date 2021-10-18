import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TaskI } from '../../interfaces/task.interface';
import { Title } from '@angular/platform-browser';
import { TaskSandbox } from './store/task.sandbox';
import { BoardService } from '../../../../../../services/board.service';
import { BoardUserI } from '../../../../../../interfaces/board-user.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  task$: Observable<TaskI | null> = this.taskSandbox.task$;
  assignee$: Observable<BoardUserI | null> = this.taskSandbox.assignee$;
  assignUserOptions$: Observable<{ id: string, text: string, img?: string }[]> = this.taskSandbox.assignUserOptions$;

  // TODO: this is workaround! Move to store!
  boardName$: Observable<string | null> = this.task$.pipe(
    switchMap((task) => task
      ? this.boardService.getCurrentUserBoards().pipe(
          map((boards) => {
            return boards.find((board) => board._id === task.boardId)
          })
        )
      : of(null)
    ),
    map((board) => board?.name || '')
  );

  constructor(
    private readonly taskSandbox: TaskSandbox,
    private readonly boardService: BoardService,
    private readonly route: ActivatedRoute,
    private readonly title: Title
  ) {
    const id = this.route.snapshot.paramMap.get('id') as string;
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
