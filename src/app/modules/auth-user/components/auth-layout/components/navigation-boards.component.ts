import { ChangeDetectionStrategy, Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { AnalyticsService } from '../../../../../services/analytics.service';
import { BoardI } from '../../../modules/pm/interfaces/board.interface';
import { AuthUserSandbox } from '../../../store/auth-user.sandbox';
import { Observable } from 'rxjs';
import { LastBoardI } from '../../../interfaces/last-boards.interface';

@Component({
  selector: 'app-navigation-boards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-button [matMenuTriggerFor]="boardsMenu">
      {{ 'auth.Boards' | transloco }}
      <mat-icon>expand_more</mat-icon>
    </button>

    <mat-menu #boardsMenu="matMenu">
      <button
        *ngFor="let board of lastBoards$ | async"
        mat-menu-item
        [routerLink]="['pm', board._id]"
      >
        {{ board.name }}
      </button>
      <button mat-menu-item routerLink="boards">{{ 'auth.AllBoards' | transloco }}</button>
    </mat-menu>
  `
})
export class NavigationBoardsComponent {
  readonly lastBoards$: Observable<LastBoardI[]> = this.authSandbox.lastBoards$;

  constructor(
    private readonly authSandbox: AuthUserSandbox
  ) {}
}
