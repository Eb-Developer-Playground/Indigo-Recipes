import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../zarchitecture/shared/shared/shared.module';
import { HeaderComponent } from '../../zarchitecture/layout/header/header.component';
import { LoginComponent } from '../../zarchitecture/layout/login/login.component';
import { MessageService } from '../../zarchitecture/services/notification-services/message.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommentsSectionComponent } from '../../zarchitecture/layout/comments-section/comments-section.component';
import { Router } from '@angular/router';
import { FooterComponent } from '../../zarchitecture/layout/footer/footer.component';
import { Option } from '../../../assets/db/db-arrays/interfaces';
import { Recipe } from '../../../assets/db/db-arrays/interfaces';



@Component({
  selector: 'app-recipe-cards',
  standalone: true,
  templateUrl: './recipe-cards.component.html',
  styleUrl: './recipe-cards.component.scss',
  imports: [
    HeaderComponent,
    SharedModule,
    FooterComponent
  ],
})

export class RecipeCardsComponent implements OnInit {

  /**********************************************************************************************************************************
   * Variable Declarations
   */
  showRating: boolean = false;
  currentlyHoveredCardId: number | null = null;
  selectedDietaryFilters: string[] = [];
  isTimeDropdownOpen: boolean = false;
  isPlaceDropdownOpen: boolean = false;
  isDietDropdownOpen: boolean = false;
  selectedItem: string = '';
  hoverUnderline: boolean = false;
  currentHoveredCardId: number | null = null;



  // Dummy Data
  cards: any[] = [
    { id: 1, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 1', rating: 3 },
    { id: 2, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 2', rating: 3 },
    { id: 4, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 3', rating: 3 },
    { id: 5, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 4', rating: 3 },
    { id: 6, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', rating: 3 },
    { id: 7, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', rating: 3 },
    { id: 8, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', rating: 3 },
    { id: 9, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', },
  ];
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

  selectedFilters: string[] = [];
  viewPortHeight!: number;
  dietarty: any;


  constructor
    (
      private messageServiceMan: MessageService,
      private dialog: MatDialog,
      private router: Router,
    ) {


  }


  /***************************************************************************************************************
   * LifeCycle Hooks
   */

  ngOnInit(): void {
    this.viewPortHeight = window.innerHeight / 4; //Get viewpoer height

  }





  /***************************************************************************************************************
   * Card Button Functions
   */

  onLike(arg0: any) {
    throw new Error('Method not implemented.');
  }

  /**** Sharing a recipe */
  onShare(title: string) {
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
        this.messageServiceMan.showNotificationMessage("Recipe shared successfully", 'snackbar-success');
        console.log('Shared on Facebook');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.messageServiceMan.showNotificationMessage("Recipe shared successfully", 'snackbar-success');
        console.log('Shared on WhatsApp');
      } else {
        this.messageServiceMan.showNotificationMessage("Recipe shared successfully", 'snackbar-success');
        console.log('Shared via Email');
      }
    });
  }

  /**** Comments Look Up  */
  commentsLookup(cardTitle: string): void {
    console.log("Card Comments Called for recipe: ", cardTitle);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    // dialogConfig.width = "600px";
    // dialogConfig.height = "900px";
    dialogConfig.data = {
      action: "View Comments",
      selectedCard: cardTitle,
    }

    const dialogRef = this.dialog.open(CommentsSectionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      //Save the input messages
    )


  }



  /**** Handle Mouse Hover */
  onMouseEnter(id: number): void {
    this.currentHoveredCardId = id;
  }

  onMouseLeave(): void {
    this.currentHoveredCardId == null;
  }

  /**** Check what card is being hovered */
  isBeingHovered(cardId: number): boolean {
    this.showRating = this.currentHoveredCardId === cardId ? true : false;
    return this.currentHoveredCardId === cardId;
  }



  /**** On Selection of a single card */
  selectSingleRecipe(cardId: number): void {
    console.log("Title Clicked::", cardId);
    const additionalData = cardId;
    const serializedData = JSON.stringify(additionalData);
    let route = '/view';
    this.router.navigate([route], {
      queryParams: {
        data: serializedData
      }
    })
  }


  /***********************************************************************************************************
   *  Search & Filter Functions
   */

  /**** Time Selection */
  timeSelected: string = '';
  onTimeFilter(): void {
    this.isTimeDropdownOpen = !this.isTimeDropdownOpen;
    this.isPlaceDropdownOpen = false;
    this.isDietDropdownOpen = false;
  }

  selectedTime(item: string): void {
    this.timeSelected = item;
    this.onTimeFilter(); // Close the dropdown after selecting an item
    // You can also perform any other action you need after selecting an item
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



}
