import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TaskI } from '../../../../interfaces/task.interface';
import { BoardUserI } from '../../../../../../../../interfaces/board-user.interface';
import { BoardSandbox } from '../../store/board.sandbox';

// TODO: make onPush STRATEGY!!!
@Component({
  selector: 'app-board-page-sidebar',
  templateUrl: './board-page-sidebar.component.html',
  styleUrls: ['./board-page-sidebar.component.scss']
})
export class BoardPageSidebarComponent {
  selectedTask$: Observable<TaskI | null> = this.boardSandbox.activeTask$;
  assignee$: Observable<BoardUserI | null> = this.boardSandbox.activeTaskAssignee$;

  // TODO: think about to move to a Pipe
  taskLink$: Observable<string> = this.selectedTask$.pipe(
    map((task) => task ? `./task/${task.boardId}-${task.number}` : '')
  );

  usersOptions$: Observable<{ id: string, text: string, img?: string }[]> = this.boardSandbox.users$.pipe(
    map((members) => {
      return members.map(({ img, _id: id, email: text }) => {
        return { id, text, img };
      });
    })
  )

  constructor(
    private readonly boardSandbox: BoardSandbox
  ) {}

  unselectTask(): void {
    this.boardSandbox.resetTask();
  }

  assignActiveTask(userId: string | null): void {
    this.boardSandbox.assignActiveTask(userId);
  }
}
