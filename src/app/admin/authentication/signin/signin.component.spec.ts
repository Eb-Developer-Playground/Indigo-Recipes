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
        { provide: MessageService, useValue: {} },
        { provide: AuthServiceService, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  beforeEach(() => {
    fb = {
      group: jest.fn(() => ({
        value: {},
        get: jest.fn(),
        setValidators: jest.fn()
      }))
    }
    component = new SigninComponent(notificationMan, authManService, fb, router);
  }); 


  it('should init sign up form', () => {
    component.generateSignUpForm();
    expect(fb.group).toHaveBeenCalledWith({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    })
  })

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
