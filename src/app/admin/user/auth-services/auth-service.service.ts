import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { User } from '../../../../assets/db/db-arrays/interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

/*******************************************************************************************
 * Using a JSON server
 */
// export class AuthServiceService {

//   constructor(
//     private _http: HttpClient,
//   ) { }

//   private apiUrl = 'http://localhost:3000';

//   login(username: string, password: string): Observable<boolean> {
//     // Assuming your JSON server endpoint for login is '/login'
//     return this._http.post<any>(`${this.apiUrl}/login`, { username, password })
//       .pipe(
//         map((response: any) => {
//           if (response && response.user) {
//             localStorage.setItem('currentUser', JSON.stringify(response.user));
//             return true;
//           } else {
//             return false;
//           }
//         }),
//         // catchError((error: any) => {
//         //   console.error('Error occurred during login:', error);
//         //   return of(false); // Return false for login failed
//         // })
//       );
//   }

//   /**** User registration */
//   registerUser(user: any): Observable<any> {
//     const url = `${this.apiUrl}/register`;
//     return this._http.post(url, user);
//   }



// }


/*******************************************************************************************
  * Array Manipulation
  */

export class AuthServiceService {

  /******************************************************************************************************** */
  private users: User[] = [];
  /******************************************************************************************************** */

  loggedInUser!: string;
  constructor(
  ) { }

  /**** User registration */
  registerUser(user: User): string {
    // Generate a unique ID for the new user
    const userId = uuidv4();
    user.userId = userId;
    this.users.push(user);
    console.log("USERS PRESENT::", this.users);
    return `You have been successfully registered`;
  }


  loginUser(usernameOrEmail: string, password: string): string | null {
    // Iterate through the users array
    for (const user of this.users) {
      // Check if the provided username/email and password match any user's credentials
      if ((user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password) {
        console.log('User logged in successfully:', user);
        // Return the username of the logged-in user
        this.loggedInUser = user.username;
        sessionStorage.setItem('username', this.loggedInUser);
        return user.username;
      }
    }
    console.error('Invalid username/email or password.');
    return null; // Return null if no matching user is found
  }

}
