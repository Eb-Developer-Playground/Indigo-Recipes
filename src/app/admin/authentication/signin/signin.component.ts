import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
  dataResponse: any;

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
      usernameOrEmail: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  generateSignUpForm(): void {
    this.signupForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  /**** Loggin In */
  onLogin(): void {
    if (this.loginForm.valid) {
      const isUserLoggedIn = this.authManService.isUserLoggedIn(this.loginForm.value.usernameOrEmail, this.loginForm.value.password) ? true : false;
      if (isUserLoggedIn) {
        let route = '/home';
        this.router.navigate([route]);
        this.notificationMan.showNotificationMessage("Login successful", "snackbar-success");
      } else {
        this.notificationMan.showNotificationMessage("Invalid credentials", "snackbar-danger");
      }
    }
  };

  /**** Sign in with gmail */
  loginWithGmail(): void {
    //pending
  };

  /**** Signing in with facebook */
  loginWithFacebook(): void {
    //Pending
  };

  /**** Signing Up User */
  onSignup(): void {
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      console.log("Signing up user::", this.signupForm.value);
      const user = this.signupForm.value;
      this.authManService
        .registerUser(user);
      console.log('User registered successfully:');
      sessionStorage.setItem('username', user.username);
      let route = '/home';
      this.router.navigate([route]);
      this.notificationMan.showNotificationMessage("You have been successfully registered", "snackbar-success");
      console.log("CREATED USER:::", this.signupForm.value);

    }
    else if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.notificationMan.showNotificationMessage("Passwords do not match.", "snackbar-danger");
    }
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



}
