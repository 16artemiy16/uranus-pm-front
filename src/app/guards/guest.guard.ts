import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route, Router,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanLoad {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isAuthed) {
      return true;
    }
    this.router.navigate(['auth']);
    return false;
  }

}
