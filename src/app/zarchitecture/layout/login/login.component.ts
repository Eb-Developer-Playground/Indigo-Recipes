import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SharedModule } from '../../shared/shared/shared.module';
import { MessageService } from '../../services/notification-services/message.service';

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
    this.notificationMan.showNotificationMessage("Login Successfull!!", 'snackbar-success')
  }

  loginWithGoogle(): void {

  }

  loginWithFacebook(): void {

  }

  /**Registration Point */
  register(): void {

  }

}
