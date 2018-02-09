import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { SignUpUser } from './user.interface';


@Injectable()
export class SignupService {

  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  
  createUser(user: SignUpUser): Observable<any>  {
    return this.http.post<any>(`${this.url}/create`, user);
  }

  searchUsername(username: string): Observable<any>  {
    return this.http.get<any>(`${this.url}/getusername?username=${encodeURIComponent(username)}`);      
  }

  searchEmail(email: string): Observable<any>  {
    return this.http.get<any>(`${this.url}/getemail?email=${encodeURIComponent(email)}`);
  }

  emailExists(email: string): Promise<any> {
    return new Promise((res, rej) => {
      this.searchEmail(email)
      .subscribe(result => res(result.exists));
    });
  }

  usernameExists(username: string): Promise<any> {
    return new Promise((res, rej) => {
      this.searchUsername(username)
      .subscribe(result => res(result.exists));
    });
  } 
}
