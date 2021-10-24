import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

type Page = 'guest' | 'signIn' | 'signUp' | 'boards' | 'board' | 'task' | 'profile';

// TODO: implement memoization decorator
@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  readonly routes: Record<Page, string> = {
    guest: '/guest',
    signIn: '/guest/sign-in',
    signUp: '/guest/sign-up',
    boards: '/boards',
    board: '/boards/:id',
    task: '/boards/:id/task/:taskId',
    profile: '/profile'
  };

  constructor(
    private readonly router: Router
  ) {}

  getRouteBoard(boardId: string): string {
    return this.routes.board.replace(':id', boardId);
  }

  getRouteTask(boardId: string, taskId: string): string {
    return this.routes.task.replace(':id', boardId).replace(':taskId', taskId);
  };

  goTo(page: Page, params: Record<string, any> = {}): Promise<boolean> {
    if (page === 'board') {
      const { id } = params;
      if (!id) {
        throw Error(`params.id needs to be specified to navigate to 'board' route. For example goTo('board', { id: 'B4' })`);
      }
      return this.router.navigate([this.getRouteBoard(id)]);
    }
    if (page === 'task') {
      const { id, taskId } = params;
      if (!id || !taskId) {
        throw Error(`params 'id' and 'taskId' need to be specified to navigate to 'task' route. For example goTo('board', { id: 'B4', taskId: 'B4-12' })`);
      }
    }
    return this.router.navigate([page]);
  }
}
