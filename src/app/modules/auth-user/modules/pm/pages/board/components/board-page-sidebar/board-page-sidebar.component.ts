import { Component } from '@angular/core';
import { ColumnsSandbox } from '../../../../store/sandboxes/columns.sandbox';
import { map, switchMap } from 'rxjs/operators';
import { BoardsSandbox } from '../../../../store/sandboxes/boards.sandbox';
import { Observable, of } from 'rxjs';
import { TaskI } from '../../../../interfaces/task.interface';
import { BoardUserI } from '../../../../../../../../interfaces/board-user.interface';

@Component({
  selector: 'app-board-page-sidebar',
  templateUrl: './board-page-sidebar.component.html',
  styleUrls: ['./board-page-sidebar.component.scss']
})
export class BoardPageSidebarComponent {
  selectedTask$: Observable<TaskI | null> = this.columnsSandbox.activeTask$;
  assignee$: Observable<BoardUserI | null> = this.selectedTask$.pipe(
    switchMap((task) => {
      return task?.assignee ? this.boardsSandbox.getMemberById(task.assignee) : of(null);
    }),
  );
  taskLink$: Observable<string> = this.selectedTask$.pipe(
    map((task) => task ? `./task/${task.boardId}-${task.number}` : '')
  );

  constructor(
    private readonly columnsSandbox: ColumnsSandbox,
    private readonly boardsSandbox: BoardsSandbox
  ) {}

  unselectTask(): void {
    this.columnsSandbox.setActiveTask(null);
  }
}
