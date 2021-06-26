import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { TaskI } from '../../interfaces/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../components/modals/create-task/create-task.component';
import { MatSidenav } from '@angular/material/sidenav';
import { ColumnsSandbox } from '../../store/sandboxes/columns.sandbox';
import { BoardsSandbox } from '../../store/sandboxes/boards.sandbox';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, OnDestroy {
  selectedTask$ = this.columnsSandbox.activeTask$;

  constructor(
    private readonly boardsSandbox: BoardsSandbox,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly columnsSandbox: ColumnsSandbox
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(take(1),)
      .subscribe(({ id }) => {
        // TODO: This is a workaround! Change in future on fetchBoardsById()
        this.boardsSandbox.fetchBoards();
        this.boardsSandbox.setSelectedBoardId(id);
        this.columnsSandbox.fetchColumns(id);
      });
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

  ngOnDestroy() {
    this.columnsSandbox.setTaskFilterText('')
  }
}
