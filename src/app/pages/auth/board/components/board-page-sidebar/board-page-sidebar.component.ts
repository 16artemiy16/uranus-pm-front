import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TaskI } from '@layouts/auth/interfaces/task.interface';
import { BoardUserI } from '@shared/models/interfaces/board-user.interface';
import { BoardSandbox } from '../../store/board.sandbox';

@Component({
  selector: 'app-board-page-sidebar',
  templateUrl: './board-page-sidebar.component.html',
  styleUrls: ['./board-page-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardPageSidebarComponent {
  selectedTask$: Observable<TaskI | null> = this.boardSandbox.activeTask$;
  assignee$: Observable<BoardUserI | null> = this.boardSandbox.activeTaskAssignee$;

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
