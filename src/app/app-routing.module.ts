import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'guest',
    loadChildren: () => import('./modules/guest-user/guest-user.module').then((m) => m.GuestUserModule)
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
