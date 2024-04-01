import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SharedModule } from '../../shared/shared/shared.module';
import { MessageService } from '../../services/notification-services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  /********************************************** Variables **********************************************/
  loginForm!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  /********************************************* Dependency Injection ************************************/
  constructor(
    private notificationMan: MessageService,
    private _fb: FormBuilder,
    private router: Router,
  ) {

  }
  /********************************************* LifeCycles **********************************************/
  ngOnInit(): void {
    this.generateLoginForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /***************************************** Methods ****************************************************/

  /**Form Management */
  generateLoginForm(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.email]],
      // username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login(): void {

    if (this.loginForm.value.email == 'sw.muriu@gmail.com' && this.loginForm.value.password == 1234) {
      this.router.navigate(['/home']);
      this.notificationMan.showNotificationMessage("Login Successfull!!", 'snackbar-success');
    } else {
      this.notificationMan.showNotificationMessage("Username or password is incorrect", "snackbar-danger");
    }
  }

  loginWithGoogle(): void {

  }

  loginWithFacebook(): void {

  }

  /**Registration Point */
  register(): void {

  }

}
