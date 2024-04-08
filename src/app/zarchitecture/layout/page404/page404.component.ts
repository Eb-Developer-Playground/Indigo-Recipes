import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent
  ],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.scss'
})
export class Page404Component {
  constructor(
    private router: Router,
  ){}

  /**** Navigate back to home */
  navigateToHome(): void {
    let route = '/home'
    this.router.navigate([route]);
  }
}
