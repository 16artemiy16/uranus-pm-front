import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BoardService } from '../../../../../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { ColumnI } from '../../interfaces/column.interface';
import { switchMap, take } from 'rxjs/operators';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskI } from '../../interfaces/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../components/modals/create-task/create-task.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  @ViewChild(MatSidenav) private readonly matSidenav!: MatSidenav;

  columns: ColumnI[] = [];
  selectedTask: TaskI | null = null;

  constructor(
    private readonly boardService: BoardService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    this.updateTasks();
  }

  onDragToggle(flag: boolean) {
    document.body.style.setProperty('cursor', flag ? 'grabbing' : '', 'important');
  }

  onDropTask(event: CdkDragDrop<TaskI[]>, targetColumnId: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.boardService
        .moveTask(event.container.data[event.currentIndex]._id, event.currentIndex)
        .subscribe();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.boardService
        .moveTask(event.container.data[event.currentIndex]._id, event.currentIndex, targetColumnId)
        .subscribe();
    }
  }

  createTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '800px',
      data: {
        boardId: this.activatedRoute.snapshot.params.id
      }
    });
    dialogRef.componentInstance.onCreate
      .pipe(take(1))
      .subscribe(() => {
        this.updateTasks();
      })
  }

  updateTasks() {
    this.activatedRoute.params
      .pipe(
        take(1),
        switchMap((params) => {
          return this.boardService.getBoardColumns(params.id);
        })
      )
      .subscribe((columns) => {
        this.columns = columns.sort((a, b) => a.order - b.order);
        this.changeDetectorRef.markForCheck();
      });
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
