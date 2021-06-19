import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BoardService } from '../../../../../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { ColumnI } from '../../interfaces/column.interface';
import { take } from 'rxjs/operators';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskI } from '../../interfaces/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../components/modals/create-task/create-task.component';
import { MatSidenav } from '@angular/material/sidenav';
import { ColumnsSandbox } from '../../store/sandboxes/columns.sandbox';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  @ViewChild(MatSidenav) private readonly matSidenav!: MatSidenav;

  columns$: Observable<ColumnI[]> = this.columnsSandbox.columns$;
  selectedTask: TaskI | null = null;

  constructor(
    private readonly boardService: BoardService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly columnsSandbox: ColumnsSandbox
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(take(1),)
      .subscribe((params) => this.columnsSandbox.fetchColumns(params.id));
  }

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

  // TODO: move to store
  createTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '800px',
      data: {
        boardId: this.activatedRoute.snapshot.params.id
      }
    });
    dialogRef.componentInstance.onCreate
      .pipe(take(1))
      .subscribe(() => null)
  }

  toggleTaskSidebar(isOpen: boolean, task?: TaskI) {
    if (isOpen) {
      this.selectedTask = <TaskI>task;
      this.matSidenav.open();
    } else {
      this.selectedTask = null;
      this.matSidenav.close();
    }
  }
}
