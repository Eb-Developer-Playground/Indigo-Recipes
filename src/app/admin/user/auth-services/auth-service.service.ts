import { Injectable } from '@angular/core';
import { User } from '../../../../assets/db-arrays/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  serverUrl: String = `${environment.baseUrl}/ap1/v1/users`;

  loggedInUser!: string;
  constructor(
    private _http: HttpClient,
  ) { }


  isUserLoggedIn(usernameOrEmail: string, password: string): boolean {
    for (const user of this.users) {
      if ((user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password) {
        console.log('User logged in successfully:', user);
        this.loggedInUser = user.username;
        sessionStorage.setItem('username', this.loggedInUser);
        sessionStorage.setItem('email', user.email, );
        return true;
      }
    }
    console.error('Invalid username/email or password.');
    return false;
  }

  /******************************************************************************************************** */
  //Server Side Services
  registerUser(userData: User): Observable<any> {
    console.log("USER DATA:::", userData)
    const userUrl = `${this.serverUrl}/register`;
    return this._http.post<any>(userUrl, userData);
  }

  //Login Uer
  logInUser(loginData: any, params: any ): Observable<any> {
    const loginUrl = `${this.serverUrl}/signIn`;
    return this._http.post<any[]>(loginUrl, loginData, { params: params });
  }

  //Fetch All users
  fetchAll(): Observable<any> {
    const url = `${this.serverUrl}/getAll`;
    return this._http.get<any[]>(url);
  }







  /******************************************************************************************************** */
  //Dummy users
  users: User[] = [
    {
      firstName: 'Sam',
      lastName: 'Sicker',
      username: 'samsicker',
      email: `samsicker@example.com`,
      password: "123456",
      confirmPassword: "123456"
    },
    {
      firstName: 'Kama',
      lastName: 'Andra',
      username: 'kamaa',
      email: `kamaa@example.com`,
      password: "123456",
      confirmPassword: "123456"
    },
    {
      firstName: 'Junior',
      lastName: 'Doe',
      username: 'junior',
      email: `junior@example.com`,
      password: "123456",
      confirmPassword: "123456"
    },
  ];

}
