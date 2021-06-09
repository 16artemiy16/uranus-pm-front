import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AuthLayoutComponent
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
    MatMenuModule
  ]
})
export class AuthUserModule { }
