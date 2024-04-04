import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { MessageService } from '../../../zarchitecture/services/notification-services/message.service';
import { AuthServiceService } from '../../user/auth-services/auth-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../zarchitecture/shared/shared/shared.module';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

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
