import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { NotificationsIconComponent } from './components/notifications-icon/notifications-icon.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    NotificationsIconComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children: [
          { path: 'pm', loadChildren: () => import('./modules/pm/pm.module').then(m => m.PmModule) },
          { path: '**', redirectTo: 'pm' }
        ]
      }
    ]),
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
