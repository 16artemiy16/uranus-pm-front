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
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { Title } from '@angular/platform-browser';
import { BoardI } from '../../../layouts/auth/interfaces/board.interface';
import { BoardSandbox } from './store/board.sandbox';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, OnDestroy {
  selectedTask$ = this.boardSandbox.activeTask$;

  constructor(
    private readonly boardSandbox: BoardSandbox,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly title: Title
  ) {}

  private initColumns() {
    this.activatedRoute.params
      .pipe(take(1))
      .subscribe(({ id }) => {
        this.boardSandbox.fetchBoard(id);
      });
  }

  private setTitle() {
    this.boardSandbox.board$
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
    this.boardSandbox.resetTaskFilterText();
  }
}
