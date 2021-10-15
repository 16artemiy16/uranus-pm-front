import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MatButtonModule } from '@angular/material/button';
import { NavigationBoardsComponent } from './components/auth-layout/components/navigation-boards.component';
import { NavigationTasksComponent } from './components/auth-layout/components/navigation-tasks.component';
import { NavigationLanguageComponent } from './components/auth-layout/components/navigation-language.component';
import { NavigationProfileComponent } from './components/auth-layout/components/navigation-profile.component';
import { StoreModule } from '@ngrx/store';
import { reducer, FEATURE_NAME } from './store/auth-user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthUserEffects } from './store/auth-user.effects';

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
          { path: 'pm', loadChildren: () => import('./modules/pm/pm.module').then(m => m.PmModule) },
          { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
          { path: '**', redirectTo: 'pm' }
        ]
      }
    ]),
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([AuthUserEffects]),
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    TranslocoModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'auth'
    }
  ]
})
export class AuthUserModule { }
