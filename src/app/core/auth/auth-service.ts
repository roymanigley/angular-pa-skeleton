import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, mergeMap, Observable, tap} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<IUser | null>(null);

  constructor(private http: HttpClient) {
  }

  initCsrf() {
    return this.http.get<IUser>('/api/auth/csrf/')
  }

  initUser() {
    this.http.get<IUser>('/api/auth/accounts/').subscribe()
  }

  logout(): void {
    this.http.post<IUser>(
      '/api/auth/logout/', {}, {withCredentials: true}
    ).pipe(
      tap(user => this.currentUser.next(user))
    ).subscribe({
      next: () => this.currentUser.next(null),
      error: () => this.currentUser.next(null)
    })
  }

  login(username: string, password: string): Observable<IUser> {
    const payload = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post<IUser>(
      '/api/auth/login/?next=/api/auth/accounts/', payload, {withCredentials: true}
    ).pipe(
      tap(user => this.currentUser.next(user))
    )
  }
}


export interface IUser {
  username: string
  permissions: string[]
}
