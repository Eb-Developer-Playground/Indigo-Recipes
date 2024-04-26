import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Mock MatSnackBar
jest.mock('@angular/material/snack-bar', () => ({
  MatSnackBar: {
    open: jest.fn()
  }
}));

describe('MessageService', () => {
  let messageService: MessageService
  let snackbarMock: MatSnackBar; 

  beforeEach(() => {
    // snackbarMock = {
    //   open: jest.fn(), 
    //   _openedSnackBarRef: {},
      
      
      
      
      
      
      
      
    
      
      
     

    //  };
    messageService = new MessageService(snackbarMock);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it('should call snackbar open with correct parameters for danger type', () => {
    const message = 'Danger Message';
    const type = 'snackbar-danger';
    const duration = 500;

    messageService.showNotificationMessage(message, type, duration);

    expect(snackbarMock.open).toHaveBeenCalledWith(message, 'X', {
      duration,
      horizontalPosition: messageService.horizontalPosition,
      verticalPosition: messageService.verticalPosition,
      panelClass: [type]
    });
  });

  it('should call snackbar open with correct parameters for success type', () => {
    const message = 'Success Message';
    const type = 'snackbar-success';
    const duration = 500;

    messageService.showNotificationMessage(message, type, duration);

    expect(snackbarMock.open).toHaveBeenCalledWith(message, 'X', {
      duration,
      horizontalPosition: messageService.horizontalPosition,
      verticalPosition: messageService.verticalPosition,
      panelClass: [type]
    });
  });

  it('should call snackbar open with correct parameters for login-snackbar type', () => {
    const message = 'Login Message';
    const type = 'login-snackbar';
    const duration = 500;

    messageService.showNotificationMessage(message, type, duration);

    expect(snackbarMock.open).toHaveBeenCalledWith(message, 'X', {
      duration,
      horizontalPosition: messageService.horizontalPosition,
      verticalPosition: messageService.verticalPosition,
      panelClass: [type]
    });
  });
});


