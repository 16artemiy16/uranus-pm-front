import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { BoardUserI } from '@shared/models/interfaces/board-user.interface';
import { BoardSandbox } from '../../store/board.sandbox';

@Component({
  selector: 'app-board-page-top-bar',
  templateUrl: './board-page-top-bar.component.html',
  styleUrls: ['./board-page-top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
