import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { BoardsSandbox } from '../../store/sandboxes/boards.sandbox';
import { FormControl } from '@angular/forms';
import { BoardUserI } from '../../../../../../interfaces/board-user.interface';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface SelectorUserI {
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

  searchControl: FormControl = new FormControl('');

  selectedUser: SelectorUserI | undefined;
  isActive: boolean = false;
  usersOptions: BoardUserI[] = [];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly boardsSandbox: BoardsSandbox,
    private readonly cdRef: ChangeDetectorRef
  ) {
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      switchMap((searchStr) => {
        return this.boardsSandbox.getMembersOrderedByEmailStr(searchStr);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((users) => {
      this.usersOptions = users;
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
    this.isActive = false;
  }

  toggleActivity(flag: boolean | undefined): void {
    this.isActive = flag === undefined ? !this.isActive : flag;

    if (this.isActive) {
      setTimeout(() => {
        this.userInput?.nativeElement?.focus();
      });
    }
  }

  setSelectedUser(user: BoardUserI | undefined): void {
    this.selectedUser = user;
    setTimeout(() => this.searchControl.setValue(user?.email || ''));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
