import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { MessageService } from '../../services/notification-services/message.service';
import { SharedModule } from '../../shared/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let notificationManService: MessageService;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MessageService, useValue: {} }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  /***********************************  */
  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    notificationManService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should show success message when response is filled', () => {
    sessionStorage.setItem('username', 'testUser');
    component.mngForm.setValue({ response: 'This is a test response' }); 

    component.onSendEmail();

    expect(notificationManService.showNotificationMessage).toHaveBeenCalledWith(
      `Thank you testUser for your feedback`, 'snackbar-success'
    );
  });

  it('should show fill form message when response is empty', () => {
    component.mngForm.setValue({ response: '' }); 

    component.onSendEmail();

    expect(notificationManService.showNotificationMessage).toHaveBeenCalledWith(
      `Kindly fill the form`, 'snackbar-success'
    );
  });
  
});
