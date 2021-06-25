import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnI } from '../../../../interfaces/column.interface';
import { ColumnsSandbox } from '../../../../store/sandboxes/columns.sandbox';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskI } from '../../../../interfaces/task.interface';

@Component({
  selector: 'app-board-page-columns',
  templateUrl: './board-page-columns.component.html',
  styleUrls: ['./board-page-columns.component.scss']
})
export class BoardPageColumnsComponent {
  readonly columns$: Observable<ColumnI[]> = this.columnsSandbox.columns$;

  constructor(
    private readonly columnsSandbox: ColumnsSandbox
  ) { }

  onDragToggle(flag: boolean) {
    document.body.style.setProperty('cursor', flag ? 'grabbing' : '', 'important');
  }

  onDropTask(event: CdkDragDrop<TaskI[]>, targetColumnId?: string) {
    const isBetweenColumns = event.previousContainer !== event.container;
    const task = event.previousContainer.data[event.previousIndex];

    this.columnsSandbox.moveTask(
      task._id,
      event.currentIndex,
      isBetweenColumns ? targetColumnId : undefined
    )
  }

  selectTask(taskId: string | null) {
    this.columnsSandbox.setActiveTask(taskId);
  }
}
