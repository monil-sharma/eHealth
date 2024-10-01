import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User, UserResponse } from '../Models/User';

@Injectable({ providedIn: 'root' })
export class LoginService {
  _isLoggedIn = false;
  apiUrl: string = 'http://localhost:5290/api/Login/';

  constructor(private http: HttpClient) {
    this._isLoggedIn = !!localStorage.getItem('isLoggedIn');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5290/api/Login/loadData');
  }

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'register', user, { headers });
  }

  login(email: string, password: string) {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('service ', email, password);

    return this.http
      .post<any>(
        this.apiUrl + 'login',
        { email, password }
        // { withCredentials: true }
      )
      .pipe(
        map((res) => {
          // const rest: UserResponse = res as UserResponse;
          console.log('Restuser', res);

          localStorage.setItem('userRole', res.userDTO.role);
          localStorage.setItem('userAddress', res.userDTO.address);
          localStorage.setItem('userPhone', res.userDTO.phone.toString());
          localStorage.setItem('userName', res.userDTO.name);
          localStorage.setItem('userId', res.userDTO.id.toString());

          this._isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('_user', email);
          // localStorage.setItem('userRole');
        }),
        catchError((error) => {
          console.error('login error:', error);
          return throwError(error);
        })
      );
  }

  logout() {
    return this.http.post(`${this.apiUrl}logout`, {}).pipe(
      tap(() => {
        this._isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('_user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userAddress');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
      })
    );
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
}
