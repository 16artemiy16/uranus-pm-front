import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ColumnsSandbox } from '../../../../store/sandboxes/columns.sandbox';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-board-page-top-bar',
  templateUrl: './board-page-top-bar.component.html',
  styleUrls: ['./board-page-top-bar.component.scss']
})
export class BoardPageTopBarComponent implements OnDestroy {
  readonly filterTextControl = this.fb.control('');
  users: { img?: string, email: string }[] = [
    {
      img: 'data:image/jpeg;base64,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',
      email: 'jack.london@gmail.com'
    },
    {
      img: 'https://globalmsk.ru/usr/person/big-person-15629077401.jpg',
      email: 'alex.pushkin@gmail.com'
    },
    {
      email: 'anon@gmail.com'
    }
  ];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly columnsSandbox: ColumnsSandbox
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}