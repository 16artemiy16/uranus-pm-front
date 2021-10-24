import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route, Router,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@services/user.service';
import { RoutingService } from '@services/routing.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanLoad {
  constructor(
    private readonly userService: UserService,
    private readonly routingService: RoutingService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isAuthed) {
      return true;
    }
    this.routingService.goTo('boards');
    return false;
  }

}
