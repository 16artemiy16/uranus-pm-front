import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskI } from '../modules/auth-user/modules/pm/interfaces/task.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly URL = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient
  ) { }

  getById(id: string): Observable<TaskI> {
    const url = `${this.URL}/tasks/${id}`;
    return this.http.get<TaskI>(url);
  }

  move(taskId: string, toIndex: number, targetColumnId?: string): Observable<boolean> {
    const url = `${this.URL}/tasks/${taskId}/move`;
    return this.http.put<boolean>(url, { toIndex, targetColumnId });
  }

  assign(taskId: string, userId: string | null): Observable<boolean> {
    const url = `${this.URL}/tasks/${taskId}/assignee`;
    return this.http.post<boolean>(url, { assignee: userId });
  }

}
