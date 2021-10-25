import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { BoardSandbox } from '../../store/board.sandbox';
import { ColumnI } from '@layouts/auth/interfaces/column.interface';
import { TaskI } from '@layouts/auth/interfaces/task.interface';
import { BoardUserI } from '@shared/models/interfaces/board-user.interface';

@Component({
  selector: 'app-board-page-columns',
  templateUrl: './board-page-columns.component.html',
  styleUrls: ['./board-page-columns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardPageColumnsComponent {
  readonly columns$: Observable<ColumnI[]> = this.boardSandbox.columns$;

  constructor(
    private readonly boardSandbox: BoardSandbox
  ) { }

  onDragToggle(flag: boolean) {
    // TODO: use injected DOCUMENT
    document.body.style.setProperty('cursor', flag ? 'grabbing' : '', 'important');
  }

  onDropTask(event: CdkDragDrop<TaskI[]>, targetColumnId?: string) {
    const isBetweenColumns = event.previousContainer !== event.container;
    const task = event.previousContainer.data[event.previousIndex];

    this.boardSandbox.moveTask(
      task._id,
      event.currentIndex,
      isBetweenColumns ? targetColumnId : undefined
    )
  }

  selectTask(taskId: string | null) {
    this.boardSandbox.setTask(taskId);
  }

  getTaskAssignee$(task: TaskI): Observable<BoardUserI | null> {
    return this.boardSandbox.getTaskAssignee$(task._id);
  }
}
