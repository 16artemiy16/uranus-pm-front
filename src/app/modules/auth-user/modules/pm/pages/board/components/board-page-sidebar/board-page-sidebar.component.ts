import { Component, HostListener } from '@angular/core';
import { ColumnsSandbox } from '../../../../store/sandboxes/columns.sandbox';
import { TaskI } from '../../../../interfaces/task.interface';

@Component({
  selector: 'app-board-page-sidebar',
  templateUrl: './board-page-sidebar.component.html',
  styleUrls: ['./board-page-sidebar.component.scss']
})
export class BoardPageSidebarComponent {
  selectedTask$ = this.columnsSandbox.activeTask$;

  constructor(
    private readonly columnsSandbox: ColumnsSandbox
  ) {}

  unselectTask() {
    this.columnsSandbox.setActiveTask(null);
  }

}
