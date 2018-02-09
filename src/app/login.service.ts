import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LoginUser } from './user.interface';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class LoginService {

  private url: string = 'http://localhost:3000/users/';

  public loggedIn: boolean = false;

  public loggedUsername: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(user: LoginUser): Observable<any> {

    return this.http.post<any>(`${this.url}/login`, user)
    .pipe(      
      catchError(err => {
        return of(err);
      }),
      tap(res => {
        if (res.error) {
          this.loggedIn = false;
          this.loggedUsername = '';            
          return;
        }

        this.loggedIn = true;
        this.loggedUsername = user.username;        
        this.cookieService.put('username', user.username, {expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});
      }),
    )
  }

  logout() {
    this.cookieService.remove('username');
    this.loggedIn = false;
    this.loggedUsername = '';    
  }

  checkIfLoggedIn(): void {
    const logged = this.cookieService.get('username');
    if (logged) {
      this.loggedUsername = logged;
      this.loggedIn = true;
    }
  }
 
}
