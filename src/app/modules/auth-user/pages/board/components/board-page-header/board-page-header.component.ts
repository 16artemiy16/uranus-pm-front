import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamManagementComponent } from '../team-management/team-management.component';
import { MatDialog } from '@angular/material/dialog';
import { BoardSandbox } from '../../store/board.sandbox';

// TODO: set onPush STRATEGY!!!
@Component({
  selector: 'app-board-page-header',
  template: `
    <a mat-button mat-stroked-button color="primary" routerLink=".." class="back-btn"><--</a>
    <div class="board-name">{{ boardName$ | async }}</div>
    <span class="flex-spacer"></span>
    <button
      mat-icon-button
      aria-label="More board options"
      class="more-btn"
      [matMenuTriggerFor]="boardMenu"
    >
      <mat-icon [inline]="true">more_horiz</mat-icon>
    </button>

    <mat-menu #boardMenu="matMenu">
      <button mat-menu-item (click)="openTeamManagement()">
        <mat-icon>group</mat-icon>
        <span>{{ 'auth.TeamManagement' | transloco }}</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    :host {
      margin-top: 2em;
      padding: 0 2em;
      display: flex;
      align-items: center;

      .board-name {
        font-size: 2em;
        margin-left: 1.25em;
      }

      .more-btn {
        font-size: 2.5em;
      }
    }
  `],
})
export class BoardPageHeaderComponent {
  readonly boardName$: Observable<string | null> = this.boardSandbox.boardName$;

  constructor(
    private readonly boardSandbox: BoardSandbox,
    private readonly dialog: MatDialog
  ) { }

  openTeamManagement() {
    this.dialog.open(TeamManagementComponent, {
      width: '900px',
      height: '90vh'
    });
  }
}
