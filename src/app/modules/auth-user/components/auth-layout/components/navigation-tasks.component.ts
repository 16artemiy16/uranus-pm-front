import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskI } from '../../../modules/pm/interfaces/task.interface';
import { take } from 'rxjs/operators';
import { AnalyticsService } from '../../../../../services/analytics.service';

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
        *ngFor="let task of favouriteTasks"
        mat-menu-item
        [routerLink]="['pm', task.boardId, 'task', task._id]"
      >
        {{ task.title }}
      </button>
    </mat-menu>
  `,
})
export class NavigationTasksComponent {
  favouriteTasks: Pick<TaskI, '_id' | 'title' | 'boardId'>[] = [];

  constructor(
    private readonly analyticsService: AnalyticsService
  ) {
    this.analyticsService
      .getUserFavouriteTasks()
      .pipe(take(1))
      .subscribe((tasks) => {
        this.favouriteTasks = tasks;
      });
  }
}
