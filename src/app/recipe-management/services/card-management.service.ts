import { Injectable } from '@angular/core';
import { Recipe } from '../../../assets/db-arrays/interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CardManagementService {

  private recipes: Recipe[] = [];
  username: string | null;
  filteredPlace: any;

  constructor() {
    this.username = localStorage.getItem('username');
  }


  /********* Post a new recipe */
  postNewRecipe(recipe: Recipe): void {
    const newId: number = parseInt(uuidv4().split('-').join(''), 16);
    recipe.recipeId = newId;
    recipe.owner = this.username;
    const newRecipes: Recipe[] = [...this.recipes];
    newRecipes.push(recipe);
    for (let recipeItem of this.recipeSample) {
      newRecipes.push(recipeItem);
    }

    this.recipes = newRecipes

    console.log("Updated recipes array:", newRecipes);

    // Return the new array with the added recipe
    // return newRecipes;
  }

  /***** Fetch based on cuisine */
  getCuisineRecipes(placeLabel: string): void {
    this.filteredPlace = this.filterRecipesByPlace(this.recipes, placeLabel);

  }
  filterRecipesByPlace(recipes: Recipe[], placeLabel: string): Recipe[] {
    console.log("RECIPES:::", this.recipes);

    return recipes.filter(recipe => recipe.place.label === placeLabel);
  }






  /***********************************************************************************************************
   * Sample Recipes
   */


  recipeSample: Recipe[] = [
    {
      title: 'Recipe 1',
      yield: 4,
      rating: 4,
      recipeId: 1,
      prepTime: 20,
      cookTime: 30,
      totalTime: 50,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'african',
        label: 'African'
      },
      ingredients: [{ ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'] }],
      tips: [{ tips: ['Tip 1', 'Tip 2'] }],
      instructions: [{ instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3'] }],
      comments: {
        sender: 'samsicker',
        text: 'This recipe was delicious! I loved the flavor combinations.'
      },
      owner: 'junior',
      isFavourited: true,
    },
    {
      title: 'Recipe 2',
      yield: 6,
      rating: 5,
      recipeId: 2,
      prepTime: 15,
      cookTime: 40,
      totalTime: 55,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'asian',
        label: 'Asian'
      },
      ingredients: [{ ingredients: ['Ingredient 4', 'Ingredient 5', 'Ingredient 6'] }],
      tips: [{ tips: ['Tip 3', 'Tip 4'] }],
      instructions: [{ instructions: ['Instruction 4', 'Instruction 5', 'Instruction 6'] }],
      comments: {
        sender: 'kamaa',
        text: 'This recipe was easy to follow and turned out great!'
      },
      owner: 'samsicker',
      isFavourited: false,
    },
    {
      title: 'Recipe 12',
      yield: 2,
      rating: 1,
      recipeId: 12,
      prepTime: 10,
      cookTime: 20,
      totalTime: 30,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'chinese',
        label: 'Chinese'
      },
      ingredients: [{ ingredients: ['Ingredient 7', 'Ingredient 8'] }],
      tips: [{ tips: ['Tip 5'] }],
      instructions: [{ instructions: ['Instruction 7', 'Instruction 8'] }],
      comments: {
        sender: 'junior',
        text: 'Needs more flavor. I will try adding some additional spices next time.'
      },
      owner: 'kamaa',
      isFavourited: true,
    },
    {
      title: 'Recipe 3',
      yield: 2,
      rating: 2,
      recipeId: 3,
      prepTime: 10,
      cookTime: 20,
      totalTime: 30,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'chinese',
        label: 'Chinese'
      },
      ingredients: [{ ingredients: ['Ingredient 7', 'Ingredient 8'] }],
      tips: [{ tips: ['Tip 5'] }],
      instructions: [{ instructions: ['Instruction 7', 'Instruction 8'] }],
      comments: {
        sender: 'samsicker',
        text: 'A quick and easy recipe for a weeknight meal.'
      },
      owner: 'junior',
      isFavourited: false,
    },
  ]




}





