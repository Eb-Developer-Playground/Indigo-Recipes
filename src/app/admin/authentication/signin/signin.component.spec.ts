import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { MessageService } from '../../../zarchitecture/services/notification-services/message.service';
import { AuthServiceService } from '../../user/auth-services/auth-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../zarchitecture/shared/shared/shared.module';
import { FormBuilder, Validators } from '@angular/forms';
import { group } from '@angular/animations';
import { Router } from '@angular/router';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let fb: FormBuilder;
  let notificationMan: MessageService;
  let authManService: AuthServiceService;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SigninComponent,
        SharedModule,
        BrowserAnimationsModule],
      providers: [
      FormBuilder,
        { provide: MessageService, useValue: {} },
        { provide: AuthServiceService, useValue: {} }, 
        {provide: Router, useValue:{}}

      ]
    })
      .compileComponents();

    
    fixture = TestBed.createComponent(SigninComponent);
    authManService = TestBed.inject(AuthServiceService);
    router = TestBed.inject(Router);
    notificationMan = TestBed.inject(MessageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should call generate sign up form', () => {
    // mock
    const formSpy = jest.spyOn(component, 'generateSignUpForm');

    // call function
    component.generateSignUpForm();
    
    // assert
    expect(formSpy).toHaveBeenCalled();
  }); 

  it('should call sign in form', () => {
    const formSpy = jest.spyOn(component, 'generateLoginForm');
    component.generateLoginForm();
    expect(formSpy).toHaveBeenCalled();
  });

  //Login Function:
  it('should show successful login', () => {
    const spyOnAuthService = jest.spyOn(authManService, 'isUserLoggedIn');
    spyOnAuthService.mockReturnValue(true);

    component.loginForm.setValue({
      usernameOrEmail: 'samsicker',
      password: 'pass123',
    }); 
    component.onLogin();

    expect(spyOnAuthService).toHaveBeenCalledWith('samsicker', 'pass123');
    expect(notificationMan.showNotificationMessage).toHaveBeenCalledWith('Login successful', 'snackbar-success');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    spyOnAuthService.mockRestore();
  })
  

  // it('should init sign up form', () => {
  //   component.generateSignUpForm();
  //   expect(fb.group).toHaveBeenCalledWith({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     username: ['', Validators.required],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: ['', Validators.required]
  //   })
  // })

  // it('should create login form with usernameOrEmail and password controls', () => {
  //   component.generateLoginForm();
  //   expect(component.loginForm).FormGroup; // Assert it's a FormGroup

  //   const usernameOrEmailControl = component.loginForm.get('usernameOrEmail');
  //   const passwordControl = component.loginForm.get('password');

  //   expect(usernameOrEmailControl).not.toBeNull();
  //   expect(passwordControl).not.toBeNull();

  //   expect(usernameOrEmailControl.value).toBe('');
  //   expect(passwordControl.value).toBe('');

  //   // Optional: Test validators
  //   expect(usernameOrEmailControl.validator).toContainEqual(Validators.required);
  //   expect(passwordControl.validator).toContainEqual(Validators.required);
  // });
});
