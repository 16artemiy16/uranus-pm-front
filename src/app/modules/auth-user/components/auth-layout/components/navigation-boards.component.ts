import { ChangeDetectionStrategy, Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { AnalyticsService } from '../../../../../services/analytics.service';
import { BoardI } from '../../../modules/pm/interfaces/board.interface';

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
        *ngFor="let board of favouriteBoards"
        mat-menu-item
        [routerLink]="['pm', 'boards', board._id]"
      >
        {{ board.name }}
      </button>
      <button mat-menu-item routerLink="boards">{{ 'auth.AllBoards' | transloco }}</button>
    </mat-menu>
  `
})
export class NavigationBoardsComponent {
  favouriteBoards: Pick<BoardI, '_id' | 'name'>[] = [];

  constructor(private readonly analyticsService: AnalyticsService) {
    this.analyticsService
      .getUserFavouriteBoards()
      .pipe(take(1))
      .subscribe((boards) => {
        this.favouriteBoards = boards;
      });
  }
}
