import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { BoardI } from '../modules/auth-user/modules/pm/interfaces/board.interface';
import { ColumnI } from '../modules/auth-user/modules/pm/interfaces/column.interface';

interface CreateBoardDto {
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  // TODO: move to config
  private readonly URL = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService
  ) { }

  getCurrentUserBoards(): Observable<BoardI[]> {
    const url = `${this.URL}/boards/owner/${this.userService.currentUser._id}`;
    return this.http.get<BoardI[]>(url);
  }

  create(boardDto: CreateBoardDto): Observable<BoardI> {
    const url = `${this.URL}/boards`;
    return this.http.post<BoardI>(url, boardDto);
  }

  getBoardColumns(boardId: string): Observable<ColumnI[]> {
    const url = `${this.URL}/boards/${boardId}/columns`;
    return this.http.get<ColumnI[]>(url);
  }

  createTask(boardId: string, title: string, body?: string): Observable<boolean> {
    const url = `${this.URL}/boards/${boardId}/task`;
    return this.http.post<boolean>(url, { title, body });
  }

  moveTask(taskId: string, toIndex: number, targetColumnId?: string): Observable<boolean> {
    const url = `${this.URL}/boards/task/${taskId}/move`;
    return this.http.put<boolean>(url, { toIndex, targetColumnId });
  }
}
