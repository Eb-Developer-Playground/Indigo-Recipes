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
    recipe.isFavourited = false;
    const newRecipes: Recipe[] = [...this.recipes];
    newRecipes.push(recipe);
    for (let recipeItem of this.recipeSample) {
      newRecipes.push(recipeItem);
    }

    this.recipes = newRecipes

    console.log("Updated recipes array:", newRecipes);

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
      title: 'Ugali Mayai',
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
      comments: [{
        sender: 'samsicker',
        text: 'This recipe was delicious! I loved the flavor combinations.'
      }],
      owner: 'junior',
      isFavourited: true,
    },
    {
      title: 'Nduma Omena',
      yield: 4,
      rating: 5,
      recipeId: 20,
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
      comments: [{
        sender: 'samsicker',
        text: 'This recipe was delicious! I loved the flavor combinations.'
      }],
      owner: 'junior',
      isFavourited: true,
    },
    {
      title: 'Pizza',
      yield: 6,
      rating: 2,
      recipeId: 2,
      prepTime: 15,
      cookTime: 40,
      totalTime: 55,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'Italian',
        label: 'Italian'
      },
      ingredients: [{ ingredients: ['Ingredient 4', 'Ingredient 5', 'Ingredient 6'] }],
      tips: [{ tips: ['Tip 3', 'Tip 4'] }],
      instructions: [{ instructions: ['Instruction 4', 'Instruction 5', 'Instruction 6'] }],
      comments:[ {
        sender: 'kamaa',
        text: 'This recipe was easy to follow and turned out great!'
      }],
      owner: 'samsicker',
      isFavourited: false,
    },
    {
      title: 'Matumbo',
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
      comments: [{
        sender: 'junior',
        text: 'Needs more flavor. I will try adding some additional spices next time.'
      }],
      owner: 'kamaa',
      isFavourited: true,
    },
    {
      title: 'Chapo Waru',
      yield: 2,
      rating: 4,
      recipeId: 21,
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
      comments: [{
        sender: 'junior',
        text: 'Needs more flavor. I will try adding some additional spices next time.'
      }],
      owner: 'kamaa',
      isFavourited: true,
    },

    {
      title: 'Minji Stew',
      yield: 2,
      rating: 3,
      recipeId: 22,
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
      comments: [{
        sender: 'junior',
        text: 'Needs more flavor. I will try adding some additional spices next time.'
      }],
      owner: 'kamaa',
      isFavourited: true,
    },
    {
      title: 'Nyama Choma',
      yield: 2,
      rating: 5,
      recipeId: 23,
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
      comments: [{
        sender: 'junior',
        text: 'Needs more flavor. I will try adding some additional spices next time.'
      }],
      owner: 'kamaa',
      isFavourited: true,
    },
    {
      title: 'Kuku Boiro',
      yield: 2,
      rating: 2,
      recipeId: 24,
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
      comments: [{
        sender: 'samsicker',
        text: 'A quick and easy recipe for a weeknight meal.'
      }],
      owner: 'junior',
      isFavourited: false,
    },
  ]




}





