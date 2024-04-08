import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../zarchitecture/shared/shared/shared.module';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../../zarchitecture/layout/header/header.component';
import { FooterComponent } from '../../zarchitecture/layout/footer/footer.component';

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
export class ManageSingularRecipeComponent implements OnInit {
  /**** Variable Declaration */
  recipeDetailsForm!: FormGroup;
  ingredientsForm: FormGroup;
  instructionsForm: FormGroup;
  tipsForm: FormGroup;
  pageFunction: string = "Add"; 

  /**** Dependency Injection */
  constructor(private fb: FormBuilder) {

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
  }


  /**********************************************************************************************************************************************
   * Life Cycle Hooks
   */
  ngOnInit(): void {
    this.initEmptyRecipeDetailsForm();

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
      cookTime: ['', [Validators.required]]
    });
  }



  /**** Defining the getter function which are triggered in the DOM structure */
  get ingredientControls() {
    return (this.ingredientsForm?.get('ingredients') as FormArray)?.controls as FormControl[];
  }

  get instructionControls() {
    return (this.instructionsForm?.get('instructions') as FormArray)?.controls as FormControl[];
  }

  get tipControls() {
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

  submit() {
    // Submit recipe data
  }
}
