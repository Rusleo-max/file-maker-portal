import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import {environment} from '../../../environments/environment';

interface SessionDTO {
  token: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseURL: string = environment.baseAPIURL;

  constructor(
    private http: HttpClient,
  ) {
  }

  login(email: string, password: string): Observable<boolean> {
    // return this.http.get<SessionDTO>(`${this.baseURL}/auth/login?email=${email}&password=${password}`).pipe(
    //   map(response => this.saveToken(response.token, response.refresh))
    // );
    return of(true);
  }

  saveToken(token: string, refresh: string): boolean {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('refresh-token', refresh);
    return true;
  }

  clearToken(): boolean {
    window.localStorage.clear();
    return true;
  }

  getAccesstoken(): string {
    return window.localStorage.getItem('token') || null;
  }

  getRefreshToken(): string {
    return window.localStorage.getItem('refresh-token') || null;
  }

  logout(): Observable<boolean> {
    const token = window.localStorage.getItem('token');
    return this.http.get<boolean>(`${this.baseURL}/auth/logout?token=${token}`).pipe(
      map(response => this.clearToken()),
    );
  }
}
