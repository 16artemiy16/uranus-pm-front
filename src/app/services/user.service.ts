import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  signUp(data: { email: string, password: string }): Observable<boolean> {
    const url = `${this.URL}/users`;
    return this.http.post<boolean>(url, data);
  }

  signIn(email: string, password: string): Observable<string> {
    const url = `${this.URL}/users/auth`;
    return this.http.post<string>(url, { email, password }, {responseType: 'text' as 'json'})
      .pipe(
        tap((token) => {
          localStorage.setItem('token', token);
        })
      );
  }
}
