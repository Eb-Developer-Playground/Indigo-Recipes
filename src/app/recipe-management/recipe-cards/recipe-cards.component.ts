import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../zarchitecture/shared/shared/shared.module';
import { HeaderComponent } from '../../zarchitecture/layout/header/header.component';
import { LoginComponent } from '../../zarchitecture/layout/login/login.component';
import { MessageService } from '../../zarchitecture/services/notification-services/message.service';

interface Recipe {
  imageUrl: string;
  name: string;
  isFavorited?: boolean; // Optional property for favorite state
};

interface Option {
  value: string;
  label: string;
  selected?: boolean; // Optional for Dietary filter
};

@Component({
  selector: 'app-recipe-cards',
  standalone: true,
  templateUrl: './recipe-cards.component.html',
  styleUrl: './recipe-cards.component.scss',
  imports: [
    HeaderComponent,
    SharedModule,
  ],
})

export class RecipeCardsComponent implements OnInit {

  /**********************************************************************************************************************************
   * Function Declarations
   */
  showRating: boolean = false;
  currentlyHoveredCardId: number | null = null;
  selectedDietaryFilters: string[] = [];
  isTimeDropdownOpen: boolean = false;
  isPlaceDropdownOpen: boolean = false;
  isDietDropdownOpen: boolean = false;
  selectedItem: string = '';


  // Dummy Data
  cards: any[] = [
    { id: 1, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 1', rating: 3 },
    { id: 2, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 2', rating: 3 },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 3', rating: 3 },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 4', rating: 3 },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', rating: 3 },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', rating: 3 },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', rating: 3 },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5', },
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
  ) {
    
    
  }


  /***************************************************************************************************************
   * LifeCycle Hooks
   */
  
  ngOnInit(): void {
    this.viewPortHeight = window.innerHeight / 4; //Get viewpoer height
    this.callWindowScroll();
  }

  @HostListener('window:scroll', ['$event'])
  callWindowScroll(): void {
    this.messageServiceMan.onWindowScroll(event)
    console.log('Window scrolled!');
  }

  



  /***************************************************************************************************************
   * Card Button Functions
   */
  onComment(id: number): void {
  }
  onLike(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onShare(arg0: any) {
    throw new Error('Method not implemented.');
  }


  /**** Handle Mouse Hover */
  onMouseEnter(id: number): void {
    // this.showRating = true
    // console.log("SIATRUE", this.showRating);

  }

  onMouseLeave(id: number): void {

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
