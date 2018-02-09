import { Injectable, transition } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Poll } from './poll.interface';

@Injectable()
export class PollsService {

  private url = 'http://localhost:3000/polls';

  constructor(private http: HttpClient) { }

  getPolls(startIndex: number, endIndex: number): Observable<any> {
    return this.http.get(`${this.url}?start_index=${startIndex}&end_index=${endIndex}`)
    .pipe(
      catchError(this.handleError),
    );
  }

  getUserPolls(author: string, startIndex: number, endIndex: number): Observable<any> {
    return this.http.get(`${this.url}/author/${author}?start_index=${startIndex}&end_index=${endIndex}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  createPoll(poll: Poll): Observable<any> {
    return this.http.post(`${this.url}/create`, poll)
    .pipe(
      catchError(this.handleError)
    )
  }

  getPoll(title: string): Observable<any> {
    return this.http.get(`${this.url}/id/${encodeURIComponent(title)}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  vote(title: string, option: string): Observable<any> {
    return this.http.get(`${this.url}/vote?title=${encodeURIComponent(title)}&option=${encodeURIComponent(option)}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(err: any) {
    console.log(err)
    return of(err);
  }
}
