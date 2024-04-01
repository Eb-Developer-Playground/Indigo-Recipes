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

  onWindowScroll(event: any) {
    // const header = this.elementRef.nativeElement.querySelector('app-header');
    // const contentBelowHeader = this.elementRef.nativeElement.querySelector('.content-below-header');

    // if (contentBelowHeader) {
    //   if (window.scrollY > 0) {
    //     contentBelowHeader.style.position = 'relative'; // or 'static'
    //   } else {
    //     const headerHeight = header ? header.offsetHeight : 0;
    //     contentBelowHeader.style.position = 'fixed';
    //     contentBelowHeader.style.top = headerHeight + 'px';
    //   }
    // }
  }
}
