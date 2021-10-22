import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { BoardUserI } from '../../../../../../interfaces/board-user.interface';
import { BoardSandbox } from '../../store/board.sandbox';

// TODO: make OnPush STRATEGY!!!
@Component({
  selector: 'app-board-page-top-bar',
  templateUrl: './board-page-top-bar.component.html',
  styleUrls: ['./board-page-top-bar.component.scss']
})
export class BoardPageTopBarComponent implements OnDestroy {
  readonly filterTextControl = this.fb.control('');
  readonly tasksFilterAssigneeId$ = this.boardSandbox.taskFilterAssigneeId$;
  readonly users$: Observable<BoardUserI[]> = this.boardSandbox.users$;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly boardSandbox: BoardSandbox
  ) {
    this.filterTextControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((text) => {
        this.boardSandbox.setTaskFilterText(text);
      });
  }

  getUserImgStyle(user: any): string {
    const src = user.img || '/assets/icons/anonymous.svg';
    return `url(${src})`;
  }

  filterTasksByUser(id: string) {
    this.boardSandbox.setTaskFilterAssigneeId(id);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
