import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUpdateComponent } from './profile-update.component';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { group } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../user/auth-services/auth-service.service';
import { MessageService } from '../../../../zarchitecture/services/notification-services/message.service';

describe('ProfileUpdateComponent', () => {
  let component: ProfileUpdateComponent;
  let fixture: ComponentFixture<ProfileUpdateComponent>;
  let _fbMock: any;
  let mockedRouter: Router;
  let _mockedAuthService: AuthServiceService;
  let _mockedMessageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    _fbMock = {
      group: jest.fn(() => ({
        value: {},
        get: jest.fn(),
        setValidators: jest.fn(),
      }))
    };

    component = new ProfileUpdateComponent(_fbMock, mockedRouter, _mockedAuthService, _mockedMessageService);
  });

  it('should initialize form group with correct initial values', () => {
    component.currentUser = {
      firstName: 'Sam',
      lastName: 'Son',
      email: 'sam@gmail.com',
      username: 'samsicker',
    };

    component.initFormWithData();

    expect(_fbMock.group).toHaveBeenCalledWith({
      // firstName: ['Sam', Validators.required],
      lastName: ['Son', Validators.required],
      email: ['sam@gmail.com', [Validators.required, Validators.email]],
      username: ['samsicker', Validators.required],
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  });

});
