import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private _snacbar: MatSnackBar, 
    // private elementRef: ElementRef,
  ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  /**Show success and error notifications */
  showNotificationMessage(
    message: string,
    type: 'snackbar-danger' | 'snackbar-success' | 'login-snackbar',
    duration: number = 500,
  ): void {
    this._snacbar.open(message, 'X', {
      duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [type]
    });
  }

  openSnackBar(message: string, panelClass: string): void {
    this._snacbar.open(message, 'Close', {
      duration: 2000,
      panelClass: [panelClass],
    });
  }
}
