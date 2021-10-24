import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MatButtonModule } from '@angular/material/button';
import { NavigationBoardsComponent } from './components/navigation-boards.component';
import { NavigationTasksComponent } from './components/navigation-tasks.component';
import { NavigationLanguageComponent } from './components/navigation-language.component';
import { NavigationProfileComponent } from './components/navigation-profile.component';
import { StoreModule } from '@ngrx/store';
import { reducer, FEATURE_NAME } from './store/auth-user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthUserEffects } from './store/auth-user.effects';
import { BoardRouteModule } from '@shared/pipes/board-route/board-route.module';
import { TaskRouteModule } from '@shared/pipes/task-route/task-route.module';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    NotificationsComponent,
    NavigationBoardsComponent,
    NavigationTasksComponent,
    NavigationLanguageComponent,
    NavigationProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children: [
          {
            path: 'boards',
            loadChildren: () => import('@pages/auth/boards/boards-page.module').then(m => m.BoardsPageModule)
          },
          {path: 'boards/:id', loadChildren: () => import('@pages/auth/board/board.module').then(m => m.BoardModule)},
          {path: 'boards/:id/task', loadChildren: () => import('@pages/auth/task/task.module').then(m => m.TaskModule)},
          {
            path: 'profile',
            loadChildren: () => import('@pages/auth/profile/profile.module').then(m => m.ProfileModule)
          },
          {path: '**', redirectTo: '/boards'}
        ]
      }
    ]),
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([AuthUserEffects]),
    BoardRouteModule,
    TaskRouteModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    TranslocoModule,
    MatButtonModule
  ],
  exports: [],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'auth'
    }
  ]
})
export class AuthUserModule { }
