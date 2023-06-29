import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = environment.apiUrl;

  private _userObject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.userObservable = this._userObject.asObservable();
  }

  login(
    personLog: any
  ): Observable<{ accessToken: string; refreshToken: string; user: User }> {
    return this.http
      .post<{ accessToken: string; refreshToken: string; user: User }>(
        `${this.BASE_URL}login`,
        personLog
      )
      .pipe(
        tap((tokens) => {
          if (tokens.accessToken && tokens.refreshToken) {
            localStorage.setItem('accessToken', tokens.accessToken as string);
            localStorage.setItem('refreshToken', tokens.refreshToken as string);
            localStorage.setItem('user', JSON.stringify(tokens.user));
          }
          this._userObject.next(tokens.user);
        })
      );
  }

  refresh(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post<{ accessToken: string }>(`${this.BASE_URL}refresh`, {
        refreshToken,
      })
      .pipe(
        tap((tokenData) => {
          if (tokenData && tokenData.accessToken) {
            localStorage.setItem('accessToken', tokenData.accessToken);
          }
        })
      );
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.toastr.warning(`👆 Kijelentkeztél!`);
    this.router.navigate(['/']);
    return this.http.post(`${this.BASE_URL}logout`, { refreshToken });
  }

  public get userObject(): any {
    console.log(this._userObject.value);
    return this._userObject.value;
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem('user');
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
