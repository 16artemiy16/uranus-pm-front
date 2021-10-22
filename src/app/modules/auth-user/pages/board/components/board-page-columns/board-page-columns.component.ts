import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnI } from '../../../../interfaces/column.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskI } from '../../../../interfaces/task.interface';
import { BoardUserI } from '../../../../../../interfaces/board-user.interface';
import { BoardSandbox } from '../../store/board.sandbox';

// TODO: set onPush STRATEGY!!!
@Component({
  selector: 'app-board-page-columns',
  templateUrl: './board-page-columns.component.html',
  styleUrls: ['./board-page-columns.component.scss']
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
