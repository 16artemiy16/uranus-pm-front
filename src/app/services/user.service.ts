import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: move to config
  private readonly URL = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient
  ) { }

  isEmailFree(email: string): Observable<boolean> {
    const url = `${this.URL}/users/email_is_free/${email}`;
    return this.http.get<boolean>(url);
  }
}
