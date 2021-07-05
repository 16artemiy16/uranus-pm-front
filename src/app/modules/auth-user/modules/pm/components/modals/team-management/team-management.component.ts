import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../../../../../services/user.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, startWith, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { UserI } from '../../../../../../../interfaces/user.interface';
import { BoardsSandbox } from '../../../store/sandboxes/boards.sandbox';
import { BoardUserI } from '../../../../../../../interfaces/board-user.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.scss']
})
export class TeamManagementComponent implements OnDestroy {
  readonly userSearchControl: FormControl = this.fb.control('');
  inviteUsersList: UserI[] = [];
  usersSource: MatTableDataSource<BoardUserI> = new MatTableDataSource<BoardUserI>([]);

  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly boardsSandbox: BoardsSandbox
  ) {
    this.boardsSandbox.boardMembers$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((members) => {
        this.usersSource.data = members;
      });

    this.userSearchControl.valueChanges
      .pipe(
        debounceTime(500),
        withLatestFrom(this.boardsSandbox.boardMembers$),
        switchMap(([searchStr, members]) => {
          const emailsToExclude = members.map((member) => member.email);
          return this.userService.searchByEmail(searchStr, { email: 1 },{ limit: 3 }, emailsToExclude);
        }),
        startWith([]),
        takeUntil(this.unsubscribe$)
      ).subscribe((users) => {
        this.inviteUsersList = users;
    });
  }

  get isInviteBtnDisabled(): boolean {
    return !this.inviteUsersList
      .map(({ email }) => email)
      .includes(this.userSearchControl.value);
  }

  getUserImgStyle(user: any): string {
    const src = user.img || '/assets/icons/anonymous.svg';
    return `url(${src})`;
  }

  getUserImgSrc(user: any): string {
    return user.img || '/assets/icons/anonymous.svg';
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
