import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardI } from '../modules/auth-user/modules/pm/interfaces/board.interface';
import { ColumnI } from '../modules/auth-user/modules/pm/interfaces/column.interface';
import { BoardUserI } from '../interfaces/board-user.interface';
import { HttpRequestCache } from '../decorators/http-request-cache.decorator';

interface CreateBoardDto {
  name: string;
  key: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  // TODO: move to config
  private readonly URL = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient
  ) { }

  getCurrentUserBoards(): Observable<BoardI[]> {
    const url = `${this.URL}/boards/my`;
    return this.http.get<BoardI[]>(url);
  }

  create(boardDto: CreateBoardDto): Observable<BoardI> {
    const url = `${this.URL}/boards`;
    return this.http.post<BoardI>(url, boardDto);
  }

  getBoard<T extends Partial<BoardI>>(boardId: string, fields: string[]): Observable<T> {
    const url = `${this.URL}/boards/${boardId}`;
    const params = { fields };
    return this.http.get<T>(url, { params });
  }

  getBoardColumns(boardId: string): Observable<ColumnI[]> {
    const url = `${this.URL}/boards/${boardId}/columns`;
    return this.http.get<ColumnI[]>(url);
  }

  createTask(boardId: string, title: string, body?: string): Observable<boolean> {
    const url = `${this.URL}/boards/${boardId}/task`;
    return this.http.post<boolean>(url, { title, body });
  }

  getMembers(boardId: string): Observable<BoardUserI[]> {
    const url = `${this.URL}/boards/${boardId}/members`;
    return this.http.get<BoardUserI[]>(url);
  }

  inviteUsers(boardId: string, ids: string[]): Observable<boolean> {
    const url = `${this.URL}/boards/${boardId}/members`;
    return this.http.post<boolean>(url, { members: ids });
  }

  removeUsers(boardId: string, ids: string[]): Observable<boolean> {
    const url = `${this.URL}/boards/${boardId}/members/delete`;
    return this.http.post<boolean>(url, { members: ids });
  }

  toggleFavouriteBoard(boardId: string): Observable<boolean> {
    const url = `${this.URL}/users/favourite/board/${boardId}/toggle`;
    return this.http.post<boolean>(url, {});
  }

  @HttpRequestCache()
  isKeyFree(key: string): Observable<Boolean> {
    const url = `${this.URL}/boards/is-key-free/${key}`;
    return this.http.get<boolean>(url);
  }
}
