import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { BoardI } from '../modules/auth-user/modules/pm/interfaces/board.interface';

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
}
