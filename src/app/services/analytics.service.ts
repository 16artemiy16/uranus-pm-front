import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BoardI } from '../modules/auth-user/modules/pm/interfaces/board.interface';

type UserEventActionT = 'visit';
type UserEventVisitData = {
  targetType: 'board' | 'task';
  targetId: string;
}
type UserEventDataT = UserEventVisitData;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly URL = 'http://localhost:3000/analytics';
  private readonly VISIT_TRACKING_DEBOUNCE_MS = 600000 // 10 min
  private boardsLastsVisitsMs: Record<string, number> = {};
  private tasksLastsVisitsMs: Record<string, number> = {};

  constructor(private readonly http: HttpClient) { }

  traceUserEvent(action: UserEventActionT, data: UserEventDataT): Observable<any> {
    const url = `${this.URL}/my-event`;
    return this.http.post(url, { action, data })
  }

  traceUserVisitBoard(board: string): Observable<any | null> {
    const lastVisitMs = this.boardsLastsVisitsMs[board];
    const currentVisitMs = new Date().getTime();

    if (lastVisitMs && (currentVisitMs - lastVisitMs < this.VISIT_TRACKING_DEBOUNCE_MS)) {
      return of(null);
    }

    const data: UserEventVisitData = { targetType: 'board', targetId: board };
    return this.traceUserEvent('visit', data).pipe(
      tap(() => this.boardsLastsVisitsMs[board] = currentVisitMs)
    );
  }

  traceUserVisitTask(task: string): Observable<any | null> {
    const lastVisitMs = this.tasksLastsVisitsMs[task];
    const currentVisitMs = new Date().getTime();

    if (lastVisitMs && (currentVisitMs - lastVisitMs < this.VISIT_TRACKING_DEBOUNCE_MS)) {
      return of(null);
    }

    const data: UserEventVisitData = { targetType: 'task', targetId: task };
    return this.traceUserEvent('visit', data).pipe(
      tap(() => this.boardsLastsVisitsMs[task] = currentVisitMs)
    );
  }

  getUserFavouriteBoards(): Observable<Pick<BoardI, '_id' | 'name'>[]> {
    const url = `${this.URL}/user/favourite/boards`;
    return this.http.get<Pick<BoardI, '_id' | 'name'>[]>(url);
  }
}
