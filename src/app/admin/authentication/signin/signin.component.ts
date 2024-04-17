import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { MessageService } from '../../../zarchitecture/services/notification-services/message.service';
import { SharedModule } from '../../../zarchitecture/shared/shared/shared.module';
import { AuthServiceService } from '../../user/auth-services/auth-service.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  /********************************************** Variables **********************************************/
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  loading = false;
  submitted = false;
  pageFunction: string = "";
  error = '';
  hide = true;
  dataResponse: any
  

  /********************************************* Dependency Injection ************************************/
  constructor(
    private notificationMan: MessageService,
    private authManService: AuthServiceService,
    private _fb: FormBuilder,
    private router: Router,

  ) {

  }
  /********************************************* LifeCycles **********************************************/
  ngOnInit(): void {
    this.pageFunction = "Login";
    console.log("SIGN IN", this.pageFunction);

    this.generateLoginForm();
    this.generateSignUpForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /***************************************** Methods ****************************************************/

  /**Form Management */
  generateLoginForm(): void {
    this.loginForm = this._fb.group({
      userNameOrEmail: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  generateSignUpForm(): void {
    this.signupForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  /**** Loggin In */
  // onLogin(): void {
  //   if (this.loginForm.valid) {
  //     const isUserLoggedIn = this.authManService.isUserLoggedIn(this.loginForm.value.usernameOrEmail, this.loginForm.value.password) ? true : false;
  //     if (isUserLoggedIn) {
  //       let route = '/home';
  //       this.router.navigate([route]);
  //       this.notificationMan.showNotificationMessage("Login successful", "snackbar-success");
  //     } else {
  //       this.notificationMan.showNotificationMessage("Invalid credentials", "snackbar-danger");
  //     }
  //   }
  // };

  onLogin(): void {
    this.authManService
      .logInUser(this.signupForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (!!res && res.statusCode == 200) {
            sessionStorage.setItem('username', res.entity.userName);
            let route = `/home`;
            this.router.navigate([route]);
            this.notificationMan.showNotificationMessage(res.message, "login-snackbar");
          } else {
            this.notificationMan.showNotificationMessage(res.message, "login-snackbar");
          }
        }, 
        error: (err) => {
          this.notificationMan.showNotificationMessage("Server Error!!", "snackbar-danger");
        }, 
        complete: ()=> {}
    })
  }

  /**** Sign in with gmail */
  loginWithGmail(): void {
    //pending
  };

  /**** Signing in with facebook */
  loginWithFacebook(): void {
    //Pending
  };

  /**** Signing Up User */
  // onSignup(): void {
  //   if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
  //     console.log("Signing up user::", this.signupForm.value);
  //     const user = this.signupForm.value;
  //     this.authManService
  //       .registerUser(user);
  //     console.log('User registered successfully:');
  //     sessionStorage.setItem('username', user.userName);
  //     sessionStorage.setItem('email', user.email);
  //     let route = '/home';
  //     this.router.navigate([route]);
  //     this.notificationMan.showNotificationMessage("You have been successfully registered", "snackbar-success");
  //     console.log("CREATED USER:::", this.signupForm.value);

  //   }
  //   else if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
  //     this.notificationMan.showNotificationMessage("Passwords do not match.", "snackbar-danger");
  //   }
  // }

  onSignup(): void {
    this.authManService
      .registerUser(this.signupForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            const username = res.entity.userName;
            const email = res.entity.email;
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('username', username);
                let route = '/home';
                this.router.navigate([route]);
            this.notificationMan.showNotificationMessage(res.message, "snackbar-success");
          } else {
            this.notificationMan.showNotificationMessage(res.message, "snackbar-danger");
          }
        },
        error: (err) => {
          this.notificationMan.showNotificationMessage(err.message, "snackbar-danger");
        },
        complete: () => { 
          this.fetchAllUsers();
        }
      });
  }


  /**Registration Point */
  onNavigateToRegistration(): void {
    this.pageFunction = "Register";
    console.log("This.Pagefunction regeister", this.pageFunction);

  }

  /**** Back To Login */
  backToLogin(): void {
    this.pageFunction = "Login";
  }


  fetchAllUsers(): void {
    this.authManService
      .fetchAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.notificationMan.showNotificationMessage(res.message, "snackbar-success");
          console.log("OUR USERS:::", res.entity);
        }, 
        error: (err) => {
          this.notificationMan.showNotificationMessage(err.message, "snackbar-danger");
        }
    })
  }



}
