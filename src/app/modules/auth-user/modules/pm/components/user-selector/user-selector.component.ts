import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, HostListener, Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { BoardsSandbox } from '../../store/sandboxes/boards.sandbox';
import { FormControl } from '@angular/forms';
import { BoardUserI } from '../../../../../../interfaces/board-user.interface';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ColumnsSandbox } from '../../store/sandboxes/columns.sandbox';

interface SelectorUserI {
  _id: string;
  email: string;
  img?: string;
}

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSelectorComponent implements OnDestroy {
  private readonly DEFAULT_IMG = '/assets/icons/anonymous.svg';

  @ViewChild('userSearch') userInput: ElementRef |  undefined;

  @Input()
  selectedUser: SelectorUserI | undefined | null;

  searchControl: FormControl = new FormControl('');

  isActive: boolean = false;
  usersOptions: (BoardUserI | undefined)[] = [];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly boardsSandbox: BoardsSandbox,
    private readonly columnsSandbox: ColumnsSandbox,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      switchMap((searchStr) => {
        return this.boardsSandbox.getMembersOrderedByEmailStr(searchStr);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((users) => {
      this.usersOptions = [undefined, ...users];
      this.cdRef.markForCheck();
    });
  }

  get imgSrc(): string {
    return this.selectedUser?.img || this.DEFAULT_IMG;
  }

  // This needs to clickOutside function to blur the component on outside click
  @HostListener('click', ['$event'])
  clickInside($event: MouseEvent) {
    $event.stopPropagation();
  }

  @HostListener('document:click')
  clickOutside() {
    if (this.isActive) {
      this.isActive = false;
      this.columnsSandbox.assignActiveTask(this.selectedUser?._id || null);
    }
  }

  toggleActivity(flag: boolean | undefined): void {
    this.isActive = flag === undefined ? !this.isActive : flag;

    if (this.isActive) {
      setTimeout(() => {
        this.searchControl.setValue(this.selectedUser?.email || 'Unassigned');
        this.userInput?.nativeElement?.focus();
      });
    }
  }

  setSelectedUser(user: BoardUserI | undefined): void {
    this.selectedUser = user;
    setTimeout(() => {
      this.searchControl.setValue(user?.email || 'Unassigned');
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
