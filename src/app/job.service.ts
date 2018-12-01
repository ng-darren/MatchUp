import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobUrl = 'http://private-76432-jobadder1.apiary-mock.com/jobs';  // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  /** GET jobs from the server */
   getJobs(): Observable<Job[]> {
     return this.http.get<Job[]>(this.jobUrl)
       .pipe(
         tap(_ => console.log('fetched jobs')),
         catchError(this.handleError('getJobs', []))
       );
   }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: Complain in the UI
       console.log(`${operation} failed: ${error.message}`);

      // keep app running by returning an empty result.
      return of(result as T);
    };
  }
}
