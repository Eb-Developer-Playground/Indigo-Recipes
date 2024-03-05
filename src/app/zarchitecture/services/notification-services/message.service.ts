import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private _snacbar: MatSnackBar
  ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  /**Show success and error notifications */
  showNotificationMessage(
    message: string,
    type: 'success' | 'error',
    duration: number = 300,
  ): void {
    this._snacbar.open(message, 'X', {
      duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [type]
    })
  }
}
