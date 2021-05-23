import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IUser } from '../models/user';
import { ILocalAuth } from '../models/local-auth';

@Injectable()
export class AuthService {
  _user$ = new Subject<IUser>();

  get isAuthenticated$(): Observable<boolean> {
    return this._user$.asObservable().pipe(map(user => !!user));
  }

  get user$(): Observable<IUser> {
    return this._user$.asObservable();
  }

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(
      `${environment.apiUrl}profile`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${this.getJwtToken()}`
        }
      })
      .pipe(tap((user: IUser) => this._user$.next(user)));
  }

  getUsers() {
    return this.http.get(
      `${environment.apiUrl}user`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${this.getJwtToken()}`
        }
      }
    );
  }

  signup(email, password, name) {
    return this.http.post(
      `${environment.apiUrl}local-auth/signup`,
      { email, password, name }
    ).pipe(tap(({ token, user }: ILocalAuth) => {
      this.setJwtToken(token);
      this._user$.next(user);
    }));
  }

  signin(email, password) {
    return this.http.post(
      `${environment.apiUrl}local-auth`,
      { email, password }
    ).pipe(tap(({ token, user }: ILocalAuth) => {
      this.setJwtToken(token);
      this._user$.next(user);
    }));
  }

  setJwtToken(token) {
    localStorage.setItem('jwt.token', token);
  }

  getJwtToken() {
    return localStorage.getItem('jwt.token');
  }

  logout() {
    localStorage.removeItem('jwt.token');
    window.location.href = `${environment.apiUrl}logout`;
  }
}
