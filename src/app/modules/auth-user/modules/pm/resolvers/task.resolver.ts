import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskI } from '../interfaces/task.interface';
import { BoardsSandbox } from '../store/sandboxes/boards.sandbox';
import { ColumnsSandbox } from '../store/sandboxes/columns.sandbox';
import { take } from 'rxjs/operators';
import { BoardService } from '../../../../../services/board.service';

// TODO: get rid of null
@Injectable({
  providedIn: 'root'
})
export class TaskResolver implements Resolve<Observable<TaskI | null>> {
  constructor(
    private readonly columnsSandbox: ColumnsSandbox,
    private readonly boardsSandbox: BoardsSandbox,
    private readonly boardService: BoardService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<TaskI | null>> | Promise<Observable<TaskI | null>> | Observable<TaskI | null> {
    const boardId = route.paramMap.get('id');
    const taskCode = route.paramMap.get('taskCode');

    if (!boardId) {
      throw Error('board id is not valid');
    }
    if (!taskCode) {
      throw Error('taskCode is not valid');
    }

    this.boardsSandbox.fetchBoards();
    this.boardsSandbox.setSelectedBoardId(boardId);
    this.columnsSandbox.fetchColumns(boardId);

    return this.boardService.getTaskByCode(taskCode).pipe(take(1));
  }
}
