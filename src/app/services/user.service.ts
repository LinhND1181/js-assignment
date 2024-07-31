import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { BASE_URL } from '../shared/basedUrls';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) { }


  // get user list data paginated and parse it to a pre-defined model array
  public getAllRandomUsersPaginated(page: number): Observable<User[]> {

    const params = new HttpParams().set('page', page).set('results', 10);

    return this.httpClient.get<any>(`${BASE_URL}`, { params }).pipe(
      map((response: any) => {
        return response.results.map((user: any) => ({
          title: user.name.title,
          first: user.name.first,
          last: user.name.last,
          username: user.login.username,
          thumbnail: user.picture.thumbnail
        }))
      }),
      catchError(error => {
        console.log('Error activating random user: ', error);
        return throwError(() => error);
      })
    );

  }

  // get user list data and parse it to a pre-defined model array
  public getAllRandomUsers(): Observable<User[]> {

    const params = new HttpParams().set('results', 100);

    return this.httpClient.get<any>(`${BASE_URL}`, { params }).pipe(
      map((response: any) => {
        return response.results.map((user: any) => ({
          title: user.name.title,
          first: user.name.first,
          last: user.name.last,
          username: user.login.username,
          thumbnail: user.picture.thumbnail
        }))
      }),
      catchError(error => {
        console.log('Error activating random user: ', error);
        return throwError(() => error);
      })
    );

  }


}
