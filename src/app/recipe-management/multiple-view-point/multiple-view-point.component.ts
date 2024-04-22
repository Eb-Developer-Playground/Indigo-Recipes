import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../zarchitecture/shared/shared/shared.module';
import { HeaderComponent } from '../../zarchitecture/layout/header/header.component';
import { FooterComponent } from '../../zarchitecture/layout/footer/footer.component';
import { MessageService } from '../../zarchitecture/services/notification-services/message.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CommentsSectionComponent } from '../../zarchitecture/layout/comments-section/comments-section.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CardManagementService } from '../services/card-management.service';
import { Recipe } from '../../../assets/db-arrays/interfaces';
import { Option } from '../../../assets/db-arrays/interfaces';
import { RecipeHolderComponent } from '../recipe-holder/recipe-holder.component';


@Component({
  selector: 'app-multiple-view-point',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
    RecipeHolderComponent,
  ],
  templateUrl: './multiple-view-point.component.html',
  styleUrl: './multiple-view-point.component.scss'
})
export class MultipleViewPointComponent implements OnInit {

  /********************************************** Variables **********************************************/
  showRating = true;
  username!: string;
  currentCuisine!: string;
  cards: Recipe[] = [];
  isTimeDropdownOpen: boolean = false;
  isPlaceDropdownOpen: boolean = false;
  isDietDropdownOpen: boolean = false;

  /********************************************* Dependency Injection ************************************/
  constructor(
    private _notificationManService: MessageService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private cardManService: CardManagementService,
  ) {

  }

  /********************************************* LifeCycles **********************************************/
  ngOnInit(): void {
    const allRecipes = this.cardManService.recipeSample;

    //Fetch data based on the incoming route params
    if (this.route.queryParams) {
      this.route.queryParams.subscribe((params) => {
        if (params.hasOwnProperty('username')) {
          console.log("DATA:::", params['data']);
          this.username = params['username'];
          const serializedData = params["data"];
          const additionalData = JSON.parse(serializedData);
          this.currentCuisine = additionalData;
          console.log("Current Cuisine", this.currentCuisine);
          this.cardManService.getCuisineRecipes(this.currentCuisine);
          this.cards = this.searchRecipesByPlaceLabel(allRecipes, this.currentCuisine);
          this._notificationManService.showNotificationMessage(`${this.currentCuisine} recipes fetched successfully!!`, "snackbar-success")
        } else {
          this._notificationManService.showNotificationMessage(`No existing recipes for ${this.currentCuisine} cuisines`, "snackbar-danger")
        }
      })
    }
  }

  /***************************************** Methods ****************************************************/
  /****** Returning values based on navigation params */
  searchRecipesByPlaceLabel(recipes: Recipe[], searchTerm: string): Recipe[] {
    if (!searchTerm) {
      return recipes;
    }
    searchTerm = searchTerm.toLowerCase(); // Make the search case-insensitive
    return recipes.filter(recipe => {
      return recipe.place?.label?.toLowerCase().includes(searchTerm);
    });
  }

  searchRecipesByTime(recipes: Recipe[], selectedTime: string): Recipe[] {
    return recipes.filter(recipe => {
      return recipe.time?.toLocaleLowerCase().includes(selectedTime.toLocaleLowerCase());
    })
  }

  /*********************** Search & Filter Functions */
  /**** Time Selection */
  timeSelected: string = '';
  onTimeFilter(): void {
    this.isTimeDropdownOpen = !this.isTimeDropdownOpen;
    this.isPlaceDropdownOpen = false;
    this.isDietDropdownOpen = false;
  }

  selectedTime(timeSelected: string): void {
    this.cards = this.searchRecipesByTime(this.cards, this.timeSelected);
    this.onTimeFilter();
  }


  /**** Place Selection */
  placeSelected: string = '';
  onPlaceFilter(): void {
    this.isPlaceDropdownOpen = !this.isPlaceDropdownOpen;
    this.isDietDropdownOpen = false;
    this.isTimeDropdownOpen = false;
  }

  selectedPlace(item: string): void {
    this.placeSelected = item;
    this.onPlaceFilter();
  }

  /**** Dietary Selection */
  dietSelected: string = '';
  onDietFilter(): void {
    this.isDietDropdownOpen = !this.isDietDropdownOpen;
    this.isPlaceDropdownOpen = false;
    this.isTimeDropdownOpen = false;
  }

  selectedDiet(item: string): void {
    this.dietSelected = item;
    this.onDietFilter();
  }


  /***************************************** Dummy Child Fxns ****************************************************/
  /**** Favoriting a recipe */
  onLike(title: string) {
    this._notificationManService.showNotificationMessage(`${title} added to your favorite recipes`, 'snackbar-success');
  }



  /**** Sharing a recipe */
  onShare(title: string): void {
    // Generate shareable link
    const shareLink = `https://example.com/share?title=${encodeURIComponent(title)}`;

    // Open Sweet Alert dialog with sharing options
    Swal.fire({
      title: 'Share via',
      showCancelButton: true,
      confirmButtonText: 'Facebook',
      cancelButtonText: 'WhatsApp',
      showCloseButton: true,
      html: `You can also <a href="mailto:?subject=Check out this article&amp;body=${shareLink}">Email</a> it.`,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._notificationManService.showNotificationMessage("Recipe shared successfully", 'snackbar-success');
        console.log('Shared on Facebook');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this._notificationManService.showNotificationMessage("Recipe shared successfully", 'snackbar-success');
        console.log('Shared on WhatsApp');
      } else {
        this._notificationManService.showNotificationMessage("Recipe shared successfully", 'snackbar-success');
        console.log('Shared via Email');
      }
    });
  }

  /**** Edit a recipe */
  onEdit(title: string) {
    const serializedData = JSON.stringify(title);
    let route = 'manage/recipe';
    this.router.navigate([route], {
      queryParams: {
        data: serializedData
      }
    })
  };

  /**** View more about a recipe */
  onSelectRecipe(recipeTitle: string) {
    console.log('Selected recipe ID:', recipeTitle);
    const additionalData = recipeTitle;
    const serializedData = JSON.stringify(additionalData);
    let route = '/view';
    this.router.navigate([route], {
      queryParams: {
        data: serializedData
      }
    })
  }

  /*** Viewing and adding comments to a recipe */
  callCommentsDialog(title: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    // dialogConfig.width = "600px";
    // dialogConfig.height = "900px";
    dialogConfig.data = {
      action: "View Comments",
      selectedCard: title,
    }

    const dialogRef = this.dialog.open(CommentsSectionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      //Save chenye wamecomment
    )
  }

  /*** Selecting a single recipe */
  onSelectSingleRecipe(recipeId: number): void {
    console.log("Title Clicked::", recipeId);
    const additionalData = recipeId;
    const serializedData = JSON.stringify(additionalData);
    let route = '/view';
    this.router.navigate([route], {
      queryParams: {
        data: serializedData
      }
    })
  }


  /**********************************************Mock Data */
  // cards: any[] = [
  //   { id: 1, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 1', rating: 3 },
  //   { id: 2, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 2', rating: 3 },
  //   { id: 4, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 3', rating: 3 },
  //   { id: 5, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 4', rating: 3 },
  //   { id: 6, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', rating: 3 },
  //   { id: 7, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', rating: 3 },
  //   { id: 8, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', rating: 3 },
  //   { id: 9, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', },
  // ];
  timeOptions: Option[] = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'brunch', label: 'Brunch' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
  ];
  placeOptions: Option[] = [
    { value: 'chinese', label: 'Chinese' },
    { value: 'african', label: 'African' },
    { value: 'italian', label: 'Italian' },
  ];

  dietaryOptions: Option[] = [
    { value: 'glutenfree', label: 'Gluten-Free', selected: false },
    { value: 'nutfree', label: 'Nut-Free', selected: false },
    // ... Add more dietary options
  ];

}
