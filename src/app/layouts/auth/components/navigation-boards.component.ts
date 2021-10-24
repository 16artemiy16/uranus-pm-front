import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthUserSandbox } from '../store/auth-user.sandbox';
import { Observable } from 'rxjs';
import { LastBoardI } from '../interfaces/last-boards.interface';
import { RoutingService } from '@services/routing.service';

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
        [routerLink]="board | boardRoute"
      >
        {{ board.name }}
      </button>
      <button mat-menu-item [routerLink]="boardsLink">{{ 'auth.AllBoards' | transloco }}</button>
    </mat-menu>
  `
})
export class NavigationBoardsComponent {
  readonly lastBoards$: Observable<LastBoardI[]> = this.authSandbox.lastBoards$;
  readonly boardsLink: string = this.routingService.routes.boards;

  constructor(
    private readonly authSandbox: AuthUserSandbox,
    private readonly routingService: RoutingService
  ) {}
}
