import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthUserSandbox } from '../store/auth-user.sandbox';
import { Observable } from 'rxjs';
import { LastTaskI } from '../interfaces/last-task.interface';
import { RoutingService } from '@services/routing.service';

@Component({
  selector: 'app-navigation-tasks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-button [matMenuTriggerFor]="tasksMenu">
      {{ 'auth.Tasks' | transloco }}
      <mat-icon>expand_more</mat-icon>
    </button>

    <mat-menu #tasksMenu="matMenu">
      <button
        *ngFor="let task of lastTasks$ | async"
        mat-menu-item
        [routerLink]="task | taskRoute"
      >
        {{ task.title }}
      </button>
    </mat-menu>
  `,
})
export class NavigationTasksComponent {
  readonly lastTasks$: Observable<LastTaskI[]> = this.authSandbox.lastTasks$;

  constructor(
    private readonly authSandbox: AuthUserSandbox
  ) {}
}
