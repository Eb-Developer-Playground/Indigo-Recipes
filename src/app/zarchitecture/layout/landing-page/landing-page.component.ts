import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { MessageService } from '../../services/notification-services/message.service';
import { FooterComponent } from '../footer/footer.component';
import { RecipeCardsComponent } from '../../../recipe-management/recipe-cards/recipe-cards.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  imports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
    RecipeCardsComponent
  ]
})
export class LandingPageComponent implements OnInit {


  cards: any[] = [
    { id: 1, imageUrl: './../../../../assets/political.png', name: 'Image 1' },
    { id: 2, imageUrl: './../../../../assets/political.png', name: 'Image 2' },
    { id: 3, imageUrl: './../../../../assets/political.png', name: 'Image 3' },
    { id: 3, imageUrl: './../../../../assets/political.png', name: 'Image 4' },
    { id: 3, imageUrl: './../../../../assets/political.png', name: 'Image 5' },
    { id: 3, imageUrl: './../../../../assets/political.png', name: 'Image 5' },
    { id: 3, imageUrl: './../../../../assets/political.png', name: 'Image 5' },
    { id: 3, imageUrl: './../../../../assets/political.png', name: 'Image 5' },
  ];
  currentlyHoveredCardId: number | null = null;
  viewPortHeight!: number;
  username: string | null;

  constructor(
    private _notificationManService: MessageService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.username = sessionStorage.getItem('username')
  }


  ngOnInit(): void {
    this.viewPortHeight = window.innerHeight / 4; //Get viewpoer height


  }


  /**************************************************************************************** */
  /********************************** FUNCTIONS******************************************** */
  /***************************************************************************************** */

  /**** Setting the country */
  setCountry(country: string): void {
    const additionalData = country;
    const serializedData = JSON.stringify(additionalData);
    let route = '/card';
    this.router.navigate([route], {
      queryParams: {
        data: serializedData,
        username: this.username
      }
    });


  }

  isHovering(cardId: number): boolean {
    return this.currentlyHoveredCardId === cardId;
  }

  fetchNewInRecipes(): void {
    
  }

}

