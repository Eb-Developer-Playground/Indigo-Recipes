import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MessageService', () => {
  let service: MessageService;
  let snackBar: MatSnackBar

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
      ]
    });
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar with correct message, type and duration', () => {
    const message = 'This is a test message';
    const type = 'snackbar-danger';
    const duration = 1000; // Override default duration

    // service.showNotificationMessage(message, type, duration);

    expect(service.showNotificationMessage(message, type, duration)).toHaveBeenCalledWith(
      message,
      'X',
      {
        duration,
        horizontalPosition: service.horizontalPosition,
        verticalPosition: service.verticalPosition,
        panelClass: [type]
      }
    );
  });

  // it('should use default duration when no duration provided', () => {
  //   const message = 'This is another test message';
  //   const type = 'snackbar-success';

  //   service.showNotificationMessage(message, type);

  //   expect(snackBar.open).toHaveBeenCalledWith(
  //     message,
  //     'X',
  //     {
  //       duration: 500, // Default duration
  //       horizontalPosition: service.horizontalPosition,
  //       verticalPosition: service.verticalPosition,
  //       panelClass: [type]
  //     }
  //   );
  // });

});


