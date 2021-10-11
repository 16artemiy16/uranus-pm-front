import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../components/modals/create-task/create-task.component';
import { ColumnsSandbox } from '../../store/sandboxes/columns.sandbox';
import { BoardsSandbox } from '../../store/sandboxes/boards.sandbox';
import { Title } from '@angular/platform-browser';
import { BoardI } from '../../interfaces/board.interface';

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
    private readonly columnsSandbox: ColumnsSandbox,
    private readonly title: Title
  ) {}

  private initColumns() {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        this.boardsSandbox.fetchBoards();
        this.boardsSandbox.setSelectedBoardId(id);
        this.columnsSandbox.fetchColumns(id);
      });
  }

  private setTitle() {
    this.boardsSandbox.selectedBoard$
      .pipe(
        filter(Boolean),
        take(1)
      )
      .subscribe((board) => this.title.setTitle((board as BoardI).name));
  }

  ngOnInit() {
    this.initColumns();
    this.setTitle();
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
