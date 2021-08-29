import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type UserEventActionT = 'visit';
type UserEventVisitData = {
  targetType: 'board';
  targetId: string;
}
type UserEventDataT = UserEventVisitData;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly URL = 'http://localhost:3000/analytics';

  constructor(private readonly http: HttpClient) { }

  traceUserEvent(action: UserEventActionT, data: UserEventDataT): Observable<any> {
    const url = `${this.URL}/my-event`;
    return this.http.post(url, { action, data })
  }

  traceUserVisitBoard(board: string): Observable<any> {
    const data: UserEventVisitData = { targetType: 'board', targetId: board };
    return this.traceUserEvent('visit', data);
  }
}
