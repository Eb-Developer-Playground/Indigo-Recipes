import { Component, ElementRef, HostListener } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private elementRef: ElementRef,

  ) { }

  addButton() {
    const route = `/add`;
    this.router.navigate([route]);
  }

  callCards(): void {
    const route = `/card/centre`;
    this.router.navigate([route]);
  }


  /**********************************************************************************************************************
   * Fixed scrolling
   */

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const header = this.elementRef.nativeElement.querySelector('app-header');
    const contentBelowHeader = this.elementRef.nativeElement.querySelector('.content-below-header');

    if (contentBelowHeader) {
      if (window.scrollY > 0) {
        contentBelowHeader.style.position = 'relative'; // or 'static'
      } else {
        const headerHeight = header ? header.offsetHeight : 0;
        contentBelowHeader.style.position = 'fixed';
        contentBelowHeader.style.top = headerHeight + 'px';
      }
    }
  }


}




