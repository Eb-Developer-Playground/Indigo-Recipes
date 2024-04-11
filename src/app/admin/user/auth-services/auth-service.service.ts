import { Injectable } from '@angular/core';
import { User } from '../../../../assets/db-arrays/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
// import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  /******************************************************************************************************** */

  serverUrl: String = `${environment.baseUrl}/ap1/v1/users`;

  loggedInUser!: string;
  constructor(
    private _http: HttpClient,
  ) { }

  /**** User registration */
  registerUser(user: User): string {
    const userId = Math.random() * 1000;
    user.userId = userId;
    this.users.push(user);
    console.log("USERS PRESENT::", this.users);
    return `You have been successfully registered`;
  }

  isUserLoggedIn(usernameOrEmail: string, password: string): boolean {
    for (const user of this.users) {
      if ((user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password) {
        console.log('User logged in successfully:', user);
        this.loggedInUser = user.username;
        sessionStorage.setItem('username', this.loggedInUser);
        sessionStorage.setItem('email', user.email);
        return true;
      }
    }
    console.error('Invalid username/email or password.');
    return false;
  }

  /******************************************************************************************************** */
  //Server Side Services
  // registerUser(userData: User): Observable<User[]>{
  //   const userUrl = `${this.serverUrl}register/`;
  //   return this._http.post<any>(userUrl, userData);
  // }




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
