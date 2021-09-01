import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ColumnsSandbox } from '../../../../store/sandboxes/columns.sandbox';
import { Observable, Subject } from 'rxjs';
import { BoardsSandbox } from '../../../../store/sandboxes/boards.sandbox';
import { BoardUserI } from '../../../../../../../../interfaces/board-user.interface';

@Component({
  selector: 'app-board-page-top-bar',
  templateUrl: './board-page-top-bar.component.html',
  styleUrls: ['./board-page-top-bar.component.scss']
})
export class BoardPageTopBarComponent implements OnDestroy {
  readonly filterTextControl = this.fb.control('');
  readonly tasksFilterAssignee$ = this.columnsSandbox.tasksFilterAssignee$;
  readonly users$: Observable<BoardUserI[]> = this.boardsSandbox.boardMembers$;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly columnsSandbox: ColumnsSandbox,
    private readonly boardsSandbox: BoardsSandbox
  ) {
    this.filterTextControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((text) => {
        this.columnsSandbox.setTaskFilterText(text);
      });
  }

  getUserImgStyle(user: any): string {
    const src = user.img || '/assets/icons/anonymous.svg';
    return `url(${src})`;
  }

  filterTasksByUser(id: string) {
    this.columnsSandbox.setTaskFilterAssigneeId(id);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
