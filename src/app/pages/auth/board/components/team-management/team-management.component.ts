import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '@services/user.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, startWith, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BoardUserI, BoardUserToInviteI } from '@shared/models/interfaces/board-user.interface';
import { BoardUserRoleEnum } from '@shared/models/enums/board-user-role.enum';
import { BoardSandbox } from '../../store/board.sandbox';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamManagementComponent implements OnDestroy {
  readonly roles = [BoardUserRoleEnum.User, BoardUserRoleEnum.Watcher, BoardUserRoleEnum.Admin];
  readonly userSearchControl: FormControl = this.fb.control('');
  inviteUsersList: BoardUserToInviteI[] = [];
  usersSource: MatTableDataSource<BoardUserI> = new MatTableDataSource<BoardUserI>([]);

  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly boardSandbox: BoardSandbox,
    private readonly cdRef: ChangeDetectorRef
  ) {
    this._watchBoardMembers();
    this._watchUserSearch();
  }

  private _watchBoardMembers(): void {
    this.boardSandbox.users$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users) => {
        this.usersSource.data = users;
      });
  }

  private _watchUserSearch(): void {
    this.userSearchControl.valueChanges
      .pipe(
        debounceTime(500),
        withLatestFrom(this.boardSandbox.users$),
        switchMap(([searchStr, members]) => {
          const emailsToExclude = members.map((member) => member.email);
          return this.userService.searchByEmail(searchStr, { email: 1, img: 1 },{ limit: 3 }, emailsToExclude);
        }),
        startWith([] as BoardUserToInviteI[]),
        takeUntil(this.unsubscribe$)
      ).subscribe((users) => {
      this.inviteUsersList = users as BoardUserToInviteI[];
      this.cdRef.markForCheck();
    });
  }

  get isInviteBtnDisabled(): boolean {
    return !this.inviteUsersList
      .map(({ email }) => email)
      .includes(this.userSearchControl.value);
  }

  get userToInvite(): BoardUserToInviteI | undefined {
    const searchStr = this.userSearchControl.value.trim();
    return this.inviteUsersList.find((user) => user.email === searchStr);
  }

  getUserImgStyle(user: any): string {
    const src = user.img || '/assets/icons/anonymous.svg';
    return `url(${src})`;
  }

  inviteUsers(): void {
    if (this.userToInvite) {
      this.boardSandbox.inviteUsers([this.userToInvite]);
      this.userSearchControl.setValue('');
    }
  }

  removeUser(id: string): void {
    this.boardSandbox.removeUsers([id]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
