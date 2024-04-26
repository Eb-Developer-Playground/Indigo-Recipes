import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {

  currentUserName!: string | null;
  currentUserEmail!: string | null;

  constructor(
    private router: Router,

  ) { }


  ngOnInit(): void {
    this.currentUserName = sessionStorage.getItem('username');
    this.currentUserEmail = sessionStorage.getItem('email');
  }


  /**** Adding a recipe */
  addRecipe(): void {
    console.log("Adding Recipe");
    let route = 'manage/recipe';
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
    const route = '/#';
    sessionStorage.clear();
    this.router.navigate([route]);
    console.log("Remaining Users::", usersArray);

  }

  updateProfile():void  {
    let route = '/profile/update';
    this.router.navigate([route]);
  }

}




