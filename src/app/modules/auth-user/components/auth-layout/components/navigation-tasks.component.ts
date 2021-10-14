import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthUserSandbox } from '../../../store/auth-user.sandbox';
import { Observable } from 'rxjs';
import { LastTaskI } from '../../../interfaces/last-task.interface';

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
        [routerLink]="['pm', task.boardId, 'task', task.boardId + '-' + task.number]"
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
