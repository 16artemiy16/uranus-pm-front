import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: 'guest',
    loadChildren: () => import('./modules/guest-user/guest-user.module').then((m) => m.GuestUserModule),
    canLoad: [GuestGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/auth-user/auth-user.module').then((m) => m.AuthUserModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'guest'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
