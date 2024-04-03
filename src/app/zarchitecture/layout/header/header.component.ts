import { Component, ElementRef, HostListener } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { Router } from '@angular/router';
import { usersArray } from '../../../../assets/db-arrays/interfaces';

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

  // allRecipes

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

  /**** Adding a recipe */
  addRecipe(): void {
    console.log("Adding Recipe");
    let route = '/manage/recipe';
    this.router.navigate([route]);
  }

  /**** Navigate back to home */
  navigateToHome(): void {
    let route = '/home'
    this.router.navigate([route]);
    console.log("Remaining Users::", usersArray);
  }

  /**** Logging out */
  onLogout(): void {
    const route = '/logout'
    this.router.navigate([route]);
    console.log("Remaining Users::", usersArray);

  }

}




