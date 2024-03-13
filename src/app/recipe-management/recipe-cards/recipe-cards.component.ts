import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../zarchitecture/shared/shared/shared.module';
import { HeaderComponent } from '../../zarchitecture/layout/header/header.component';

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
  selectedTime: string = '';
  selectedPlace: string = '';
  selectedDietary: Option[] = [];
  currentlyHoveredCardId: number | null = null;
  cards: any[] = [
    { id: 1, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 1' },
    { id: 2, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 2' },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 3' },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 4' },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5' },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5' },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5' },
    { id: 3, recipeTitle: "TEST TITLE", imageUrl: './../../../../assets/political.png', name: 'Image 5' },
  ];



  viewPortHeight!: number;
dietarty: any;

  constructor() {

  }


  /**********************************************************************************************************************************
   * LifeCycle Hooks
   */
  ngOnInit(): void {
    this.viewPortHeight = window.innerHeight / 4; //Get viewpoer height
  }


  

  
  
  /**********************************************************************************************************************************
   * Card Button Functions
   */
  isHovering(cardId: number): boolean {
    console.log("UUUUIIIIII", cardId);

    return this.currentlyHoveredCardId === cardId;
  }

  onComment(id: number): void {

  }
  onLike(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onShare(arg0: any) {
    throw new Error('Method not implemented.');
  }

  onMouseEnter(id: number): void {
    // this.showRating = true
    // console.log("SIATRUE", this.showRating);

  }

  onMouseLeave(id: number): void {
    // this.showRating = false
    // console.log("SIAFlase", this.showRating);

  }


  /*********************************************************************************************************** */
  // Search & Filter Functions
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

  onTimeChange(value: string) {
    this.selectedTime = value;
    // Implement logic to handle time filter change
  }

  onPlaceChange(value: string) {
    this.selectedPlace = value;
    // Implement logic to handle place filter change
  }

  onDietaryChange(value: Option[]) {
    this.selectedDietary = value;
    // Implement logic to handle dietary filter change
  }
}
