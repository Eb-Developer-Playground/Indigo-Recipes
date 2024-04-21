import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../zarchitecture/shared/shared/shared.module';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../../zarchitecture/layout/header/header.component';
import { FooterComponent } from '../../zarchitecture/layout/footer/footer.component';
import { Option, Recipe } from '../../../assets/db-arrays/interfaces';
import { CardManagementService } from '../aa-data/services/card-management.service';
import { MessageService } from '../../zarchitecture/services/notification-services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-manage-singular-recipe',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './manage-singular-recipe.component.html',
  styleUrl: './manage-singular-recipe.component.scss'
})
export class ManageSingularRecipeComponent implements OnInit, OnDestroy{
  /**** Variable Declaration */
  recipeDetailsForm!: FormGroup;
  ingredientsForm!: FormGroup;
  instructionsForm: FormGroup;
  tipsForm: FormGroup;
  pageFunction: string = "Add";
  username: string | null;
  formData: any;
  ingredientsArray: any;
  ingeredientsData: any;
  tipsData: any;
  instructionsData: any;
  existingRecipes: any;
  detroy$: Subject<any> = new Subject<boolean>();

  placeOptions: Option[] = [
    { value: 'chinese', label: 'Chinese' },
    { value: 'african', label: 'African' },
    { value: 'italian', label: 'Italian' },
  ];

  timeOptions: Option[] = [
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Brunch', label: 'Brunch' },
    { value: 'Lunch', label: 'Lunch' },
    { value: 'Dinner', label: 'Dinner' },
  ];

  

  /**** Dependency Injection */
  constructor(
    private fb: FormBuilder,
    private cardManService: CardManagementService,
    private notificationManService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    /**** Generate the forms whose form fields are not fixed */
    this.ingredientsForm = this.fb.group({
      ingredients: this.fb.array([]) as FormArray
    });

    this.instructionsForm = this.fb.group({
      instructions: this.fb.array([]) as FormArray,
    });

    this.tipsForm = this.fb.group({
      tips: this.fb.array([]) as FormArray,
    });

    this.username = sessionStorage.getItem('username');
  }


  /**********************************************************************************************************************************************
   * Life Cycle Hooks
   */
  ngOnInit(): void {
    this.initEmptyRecipeDetailsForm();
    

    if (!this.route.queryParams) {
      this.pageFunction = 'Add';
    } else {
      this.route.queryParams.subscribe({
        next: (params) => {
          if (params.hasOwnProperty('data')) {
            const serializedData = params["data"];
            const searchTerm = JSON.parse(serializedData);
            this.existingRecipes = this.cardManService.recipeSample;
            this.formData = this.searchRecipesByTitle(this.existingRecipes, searchTerm)[0]
            console.log("FORMDATA:", this.formData);

            this.pageFunction = 'Update'


            //Initialize recipe Details form with data 
            this.recipeDetailsForm = this.fb.group({
              title: [this.formData.title, [Validators.required]],
              yield: [this.formData.yield, [Validators.required]],
              prepTime: [this.formData.prepTime, [Validators.required]],
              cookTime: [this.formData.cookTime, [Validators.required]],
              place: [this.formData.place, [Validators.required]],
              time: [this.formData.time, [Validators.required]],
            });


            //Call the dat for the nested arrays of the recipeDetails Form
            this.ingeredientsData = this.formData.ingredients
            this.tipsData = this.formData.tips;
            this.instructionsData = this.formData.instructions;

            //Populate the forms with the collected nested arrays data
            this.populateFormsWithData();

            // this.ingredientsArray = this.formData.ingredients;
            // console.log("ingredientsArray", this.ingredientsArray)
            // this.tipsForm.value.tips.push(this.formData.tips);
            // this.instructionsForm.value.instructions.push(this.formData.instructions);
          }
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.detroy$.next(true);
    this.detroy$.complete();
  }


  /**********************************************************************************************************************************************
    * Function Defintions
    */
  /**** Initiate the fized recipe details form */
  initEmptyRecipeDetailsForm(): void {
    this.recipeDetailsForm = this.fb.group({
      title: ['', [Validators.required]],
      yield: ['', [Validators.required]],
      prepTime: ['', [Validators.required]],
      cookTime: ['', [Validators.required]],
      place: ['', [Validators.required]],
      time: ['', [Validators.required]],
      totalTime: [''],
      ingredients: [[]],
      tips: [[]],
      instructions: [[]],
    });
  };

  /**** Init nested arrays kama empty form groups of arrays */
  // initEmptyIngredientsForm(): void {
  //   this.ingredientsForm = this.fb.group({
  //     ingredients: this.fb.array([]),
  //   });
  // }

  // initEmptyInstructionsForm(): void {
  //   this.instructionsForm = this.fb.group({
  //     instructions: this.fb.array([]),
  //   });
  // };

  // initEmptyTipsForm(): void {
  //   this.tipsForm = this.fb.group({
  //     tips: this.fb.array([]),
  //   });
  // }


  /**** Defining the getter function which are triggered in the DOM structure */
  get ingredientControls() {
    return (this.ingredientsForm?.get('ingredients') as FormArray)?.controls as FormControl[];
  }

  get instructionControls() {
    return (this.instructionsForm?.get('instructions') as FormArray)?.controls as FormControl[];
  }

  get tipsControls() {
    return (this.tipsForm?.get('tips') as FormArray)?.controls as FormControl[];
  }



  /**** Defining addition and substraction of form fields in the unfixed forms */
  addIngredient() {
    const ingredientControl = this.fb.control('', [Validators.required]);
    (this.ingredientsForm.get('ingredients') as FormArray).push(ingredientControl);
  }

  removeIngredient(index: number) {
    (this.ingredientsForm.get('ingredients') as FormArray).removeAt(index);
  }

  addInstruction() {
    const instructionControl = this.fb.control('', [Validators.required]);
    (this.instructionsForm.get('instructions') as FormArray).push(instructionControl);
  }

  removeInstruction(index: number) {
    (this.instructionsForm.get('instructions') as FormArray).removeAt(index);
  }

  addTip() {
    const tipControl = this.fb.control('', [Validators.required]);
    (this.tipsForm.get('tips') as FormArray).push(tipControl);
  }

  removeTip(index: number) {
    (this.tipsForm.get('tips') as FormArray).removeAt(index);
  }

  /**** Form Submission */

  // onSubmit(): void {
  //   this.patchNestedArrays();
  //   if (this.pageFunction == 'Add') {
  //     console.log("RecipeDetails:::", this.recipeDetailsForm.value);
  //     this.cardManService.postNewRecipe(this.recipeDetailsForm.value);
  //     this.notificationManService.showNotificationMessage("Recipe added successfully!", "snackbar-success");
  //     this.router.navigate(['/home']);
  //   } else {
  //     const updatedRecipe = this.recipeDetailsForm.value;
  //     this.existingRecipes = this.cardManService.recipeSample;
  //     const updatedRecipesArray = this.existingRecipes.map((recipe: Recipe) => recipe == this.formData ? {
  //       ...updatedRecipe
  //     } : recipe);
  //     console.log("Existing Recipes", this.existingRecipes);
  //     console.log("Updated Recipes", updatedRecipesArray);
  //     this.existingRecipes = updatedRecipesArray;
  //   }

  // }


  patchNestedArrays() {




    this.recipeDetailsForm.value.ingredients.push(this.ingredientsForm.value);
    this.recipeDetailsForm.value.instructions.push(this.instructionsForm.value);
    this.recipeDetailsForm.value.tips.push(this.tipsForm.value);
    this.recipeDetailsForm.value.totalTime = this.recipeDetailsForm.value.prepTime + this.recipeDetailsForm.value.cookTime;

  }

  /**** Fetch a single recipe for update */
  searchRecipesByTitle(recipes: Recipe[], searchTerm: string): Recipe[] {
    if (!searchTerm) {
      return recipes;
    }
    searchTerm = searchTerm.toLowerCase();
    return recipes.filter(recipe => {
      return recipe.title?.toLowerCase().includes(searchTerm);
    });
  }

  /**** Populate forms with the recieved data */
  populateFormsWithData(): void {
    if (this.ingeredientsData && this.ingeredientsData.length > 0) {
      //Since the formData is an array of objects, and we need the ingredient value in each object, we have to loop through
      this.ingeredientsData.forEach((ingredientObject: any) => {
        //Pick the object for each j
        const ingredientValue = ingredientObject.ingredient;
        this.ingredientControls.push(this.fb.control(ingredientValue, Validators.required));
      });
    }

     
    if (this.instructionsData && this.instructionsData.length > 0) {
      this.instructionsData.forEach((insrtructionObj: any) => {
        const instructionValue = insrtructionObj.instruction;
        this.instructionControls.push(this.fb.control(instructionValue, Validators.required));
      });
    }

    if (this.tipsData && this.tipsData.length > 0) {
      this.tipsData.forEach((tipsObj: any) => {
        const tipsValue = tipsObj.tip;
        this.tipsControls.push(this.fb.control(tipsValue, Validators.required));
      });
    }
  }



/***********************************************************************************************************************
 * Server side integration
 */
  
  onSubmit(): void {
    this.patchNestedArrays();

    console.log("TEST PLACE", this.recipeDetailsForm.value.place.label)

    const payload: Recipe = {
      title: this.recipeDetailsForm.value.title,
      yield: this.recipeDetailsForm.value.yield,
      prepTime: this.recipeDetailsForm.value.prepTime,
      cookTime: this.recipeDetailsForm.value.cookTime,
      place: this.recipeDetailsForm.value.place.label,
      time: this.recipeDetailsForm.value.time.label,
      totalTime: this.recipeDetailsForm.value.prepTime + this.recipeDetailsForm.value.cookTime,
      ingredients: this.ingredientsForm.value.ingredients,
      tips: this.tipsForm.value.tips,
      instructions: this.instructionsForm.value.instructions,
      comments: [],
      rating: 0,
      imageUrl: '',
      id: 0 ,
    }

    

    if (this.pageFunction == "Add") {
      console.log(" PAYLOAD:::", payload);
      
      this.cardManService
        .postNewRecipe(payload)
        .pipe(takeUntil(this.detroy$))
        .subscribe({
          next: (res) => {
            console.log("DATA SENT", this.recipeDetailsForm.value)
            console.log("RES", res);
            if (res.statusCode == 200) {
              this.notificationManService.showNotificationMessage(res.message, "snackbar-success");
              this.router.navigate(['/home']);
            }
            else {
              this.notificationManService.showNotificationMessage(res.message, "snackbar-danger");
             }
          }, 
          error: (err) => {
            this.notificationManService.showNotificationMessage(err.message, "snackbar-danger");
          },
          complete: () => {
            
          }
      })

    }
  }
}

