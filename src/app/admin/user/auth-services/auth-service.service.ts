import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private _http: HttpClient,
  ) { }

  private apiUrl = 'http://localhost:3000';

  login(username: string, password: string): Observable<boolean> {
    // Assuming your JSON server endpoint for login is '/login'
    return this._http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map((response: any) => {
          if (response && response.user) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            return true; 
          } else {
            return false;
          }
        }),
        // catchError((error: any) => {
        //   console.error('Error occurred during login:', error);
        //   return of(false); // Return false for login failed
        // })
      );
  }

}
