import { Component, OnDestroy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map, takeUntil } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';
import { AnalyticsService } from '../../../../services/analytics.service';
import { BoardI } from '../../modules/pm/interfaces/board.interface';
import { Subject } from 'rxjs';
import { TaskI } from '../../modules/pm/interfaces/task.interface';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnDestroy {
  currentLang$ = this.transloco.langChanges$;
  langList$ = this.transloco.langChanges$.pipe(
    map(() => this.transloco.getAvailableLangs() as string[])
  );
  favouriteBoards: Pick<BoardI, '_id' | 'name'>[] = [];
  favouriteTasks: Pick<TaskI, '_id' | 'title' | 'boardId'>[] = [];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly transloco: TranslocoService,
    private readonly userService: UserService,
    private readonly analyticsService: AnalyticsService
  ) {
    this.analyticsService
      .getUserFavouriteBoards()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((boards) => {
        this.favouriteBoards = boards;
      });

    this.analyticsService
      .getUserFavouriteTasks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tasks) => {
        this.favouriteTasks = tasks;
      });
  }

  changeLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }

  logOut() {
    this.userService.logOut();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
