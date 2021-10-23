import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserI } from '@shared/models/interfaces/user.interface';
import { HttpRequestCache } from '@shared/decorators/http-request-cache.decorator';
import { NotificationI } from '@layouts/auth/interfaces/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: move to config
  private readonly URL = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get currentUser(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }

  get isAuthed(): boolean {
    return !!this.currentUser;
  }

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

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['guest'])
  }

  @HttpRequestCache()
  searchByEmail(email: string, projection = {}, options = {}, emailsToExclude: string[] = []): Observable<Partial<UserI>[]> {
    const url = `${this.URL}/users/get-custom`;
    return this.http.post<UserI[]>(url, {
      projection,
      options,
      query: {
        $and: [{ email: { $regex: email } }, { email: { $nin: emailsToExclude } }]
      }
    });
  }

  getMyNotifications(): Observable<NotificationI[]> {
    const url = `${this.URL}/users/notifications`;
    return this.http.get<NotificationI[]>(url);
  }
}
