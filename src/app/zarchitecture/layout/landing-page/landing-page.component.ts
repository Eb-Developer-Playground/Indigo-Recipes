import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { MessageService } from '../../services/notification-services/message.service';
import { FooterComponent } from '../footer/footer.component';
import { RecipeCardsComponent } from '../../../recipe-management/recipe-cards/recipe-cards.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipe } from '../../../../assets/db-arrays/interfaces';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CardManagementService } from '../../../recipe-management/services/card-management.service';

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
  favoriteRecipes: any;
  myRecipes: any;
  newRecipes: any;
  allRecipes: any;


  constructor(
    private _notificationManService: MessageService,
    private router: Router,
    private snackbar: MatSnackBar,
    private cardManServices: CardManagementService,
  ) {
    this.username = sessionStorage.getItem('username');
    
  }


  ngOnInit(): void {
    this.viewPortHeight = window.innerHeight / 4; //Get viewpoer height
    this.allRecipes = this.cardManServices.recipeSample;
    

    /**** Fetching Recipes */
    this.favoriteRecipes = this.findRecipeByOwnerAndFavorited(this.allRecipes, this.username, true);
    this.myRecipes = this.findRecipesByOwner(this.allRecipes, this.username);
    this.newRecipes = this.fetchLastFourRecipes(this.allRecipes);
    



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



  /******* Fetching favourite recipes */
  findRecipeByOwnerAndFavorited(recipes: Recipe[], owner: string | null, isFavourited: boolean): Recipe | undefined {
    return recipes.find(recipe => recipe.owner === owner && recipe.isFavourited === isFavourited);
  }

  /**** Fetching My Recipes */
  findRecipesByOwner(recipes: Recipe[], owner: string | null): Recipe[] {
    return recipes.filter(recipe => recipe.owner === owner);
  }

  /****  Fetching new recipes (Last 4 recipes) */
  fetchLastFourRecipes(recipes: Recipe[]): Recipe[] {
    const numOfRecipes = recipes.length;
    return numOfRecipes >= 4 ? recipes.slice(-4) : recipes;
  }



  /**** Listening for the changing of tabs */
  onTabChange(event: Event) {
    if (event instanceof MatTabChangeEvent) {
      const selectedTabIndex = event.index;
      const selectedTabLabel = event.tab.textLabel; // Get the label of the selected tab
      console.log('Selected tab label:', selectedTabLabel);
    }
  }

}

