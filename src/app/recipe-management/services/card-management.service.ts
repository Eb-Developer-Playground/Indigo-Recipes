import { Injectable } from '@angular/core';
import { Recipe } from '../../../assets/db/db-arrays/interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CardManagementService {

  private recipes: Recipe[] = []

  constructor() { }

  postNewRecipe(recipe: Recipe): void { 
    const newId = uuidv4();
    recipe.recipeId = newId;
    this.recipes.push(recipe);
    
  }


}
