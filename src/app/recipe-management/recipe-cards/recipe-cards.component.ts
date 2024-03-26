import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../zarchitecture/shared/shared/shared.module';
import { HeaderComponent } from '../../zarchitecture/layout/header/header.component';
import { LoginComponent } from '../../zarchitecture/layout/login/login.component';

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

interface DropdownOption {
  value: number;
  label: string;
  selected?: boolean;
}

interface Dropdown {
  id: number;
  label: string;
  isOpen: boolean;
  items: DropdownOption[];
}

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
  selectedDietaryFilters: string[] = [];


  // Dummy Data
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

  onTimeChange(value: string) {
    this.selectedTime = value;
    this.updateSelectedFilters(value);
  }

  onPlaceChange(value: string) {
    this.selectedPlace = value;
    // Implement logic to handle place filter change
  }

  onDietaryChange(value: Option[]) {
    this.selectedDietary = value;
    // Implement logic to handle dietary filter change
  }

  // updateSelectedFilters(...filters: string[]) {
  //   this.selectedFilters = filters.filter(filter => filter); // Remove empty filters
  // }

  updateSelectedFilters(filterType: string, value?: string) {
    if (value) {
      filterType = value; // Update specific filter property (time/place
    }
  }


  removeFilter(filterType: string, filterValue?: string) {
    switch (filterType) {
      case 'time':
        this.selectedTime = '';
        break;
      case 'place':
        this.selectedPlace = '';
        break;
      case 'dietary':
        if (filterValue) {
          this.selectedDietary = this.selectedDietary.map(option => {
            if (option.label === filterValue) {
              option.selected = false; // Deselect the specific dietary option
            }
            return option;
          });
          this.selectedDietaryFilters = this.selectedDietaryFilters.filter(f => f !== filterValue);
        }
        break;
    }
    // Implement logic to update UI/backend based on removed filter
  }

  trackByFilter(index: number, filter: string) {
    return filter;
  }






  dropdowns: Dropdown[] = [
    {
      id: 1, label: 'Drop-Down A', isOpen: false, items: [
        { value: 1, label: 'Item 1', selected: false },
        { value: 2, label: 'Item 2', selected: false },
        { value: 3, label: 'Item 3', selected: false },
        { value: 4, label: 'Item 4', selected: false },
        { value: 5, label: 'Item 5', selected: false },
      ]
    },
    {
      id: 2, label: 'Drop-Down Between', isOpen: false, items: [
        { value: 6, label: 'Item 6', selected: false },
        { value: 7, label: 'Item 7', selected: false },
      ]
    },
  ];

  trackByDropdown(index: number, dropdown: Dropdown) {
    return dropdown.id;
  }

  trackByItem(index: number, item: DropdownOption) {
    return item.value;
  }

  toggleDropdown(dropdownId: number) {
    console.log("DROP DOWN TOGGLE", dropdownId);

    this.dropdowns.forEach(dropdown => dropdown.id === dropdownId ? dropdown.isOpen = !dropdown.isOpen : dropdown.isOpen = false);
  }

  onSelectionChange(dropdownId: number, value: number) {
    // Implement logic to handle selection change based on dropdownId and value
    // You can close the dropdown here after selection (optional)
  }
}
