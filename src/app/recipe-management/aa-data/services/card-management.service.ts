import { Injectable } from '@angular/core';
import { Recipe } from '../../../../assets/db-arrays/interfaces';

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
    const newId = Math.random() * 1000;
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
      time: "Breakfast",
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'african',
        label: 'African'
      },
      ingredients: [
        { ingredient: "2 boneless, skinless chicken breasts" },
        { ingredient: "1 tablespoon olive oil" },
        { ingredient: "1 teaspoon dried oregano" },
        { ingredient: "1/2 teaspoon garlic powder" },
        { ingredient: "1/4 teaspoon salt" },
        { ingredient: "1/4 teaspoon black pepper" },
        { ingredient: "1 bunch asparagus, trimmed" },
        { ingredient: "1 lemon, sliced" }
      ],
      instructions: [
        { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
        { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
        { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
        { instruction: "Top with lemon slices." },
        { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
      ],
      tips: [
        { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
        { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
        { tip: "Serve with rice or quinoa for a complete meal." }
      ],
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
      time: "Brunch",
      recipeId: 20,
      prepTime: 20,
      cookTime: 30,
      time: "Brunch",
      totalTime: 50,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'african',
        label: 'African'
      },
      ingredients: [
        { ingredient: "2 boneless, skinless chicken breasts" },
        { ingredient: "1 tablespoon olive oil" },
        { ingredient: "1 teaspoon dried oregano" },
        { ingredient: "1/2 teaspoon garlic powder" },
        { ingredient: "1/4 teaspoon salt" },
        { ingredient: "1/4 teaspoon black pepper" },
        { ingredient: "1 bunch asparagus, trimmed" },
        { ingredient: "1 lemon, sliced" }
      ],
      instructions: [
        { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
        { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
        { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
        { instruction: "Top with lemon slices." },
        { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
      ],
      tips: [
        { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
        { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
        { tip: "Serve with rice or quinoa for a complete meal." }
      ],
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
      time: "Dinner",
      recipeId: 2,
      time: "Lunch",
      prepTime: 15,
      cookTime: 40,
      totalTime: 55,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'Italian',
        label: 'Italian'
      },
      ingredients: [
        { ingredient: "2 boneless, skinless chicken breasts" },
        { ingredient: "1 tablespoon olive oil" },
        { ingredient: "1 teaspoon dried oregano" },
        { ingredient: "1/2 teaspoon garlic powder" },
        { ingredient: "1/4 teaspoon salt" },
        { ingredient: "1/4 teaspoon black pepper" },
        { ingredient: "1 bunch asparagus, trimmed" },
        { ingredient: "1 lemon, sliced" }
      ],
      instructions: [
        { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
        { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
        { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
        { instruction: "Top with lemon slices." },
        { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
      ],
      tips: [
        { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
        { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
        { tip: "Serve with rice or quinoa for a complete meal." }
      ],
      comments: [{
        sender: 'kamaa',
        text: 'This recipe was easy to follow and turned out great!'
      }],
      owner: 'samsicker',
      isFavourited: false,
    },
    {
      title: 'Matumbo',
      yield: 2,
      time: "Lunch",
      rating: 1,
      recipeId: 12,
      prepTime: 10,
      time: "Dinner",
      cookTime: 20,
      totalTime: 30,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'chinese',
        label: 'Chinese'
      },
      ingredients: [
        { ingredient: "2 boneless, skinless chicken breasts" },
        { ingredient: "1 tablespoon olive oil" },
        { ingredient: "1 teaspoon dried oregano" },
        { ingredient: "1/2 teaspoon garlic powder" },
        { ingredient: "1/4 teaspoon salt" },
        { ingredient: "1/4 teaspoon black pepper" },
        { ingredient: "1 bunch asparagus, trimmed" },
        { ingredient: "1 lemon, sliced" }
      ],
      instructions: [
        { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
        { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
        { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
        { instruction: "Top with lemon slices." },
        { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
      ],
      tips: [
        { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
        { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
        { tip: "Serve with rice or quinoa for a complete meal." }
      ],
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
      time: "Breakfast",
      recipeId: 21,
      prepTime: 10,
      time: "Breakfast",
      cookTime: 20,
      totalTime: 30,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'chinese',
        label: 'Chinese'
      },
      ingredients: [
        { ingredient: "2 boneless, skinless chicken breasts" },
        { ingredient: "1 tablespoon olive oil" },
        { ingredient: "1 teaspoon dried oregano" },
        { ingredient: "1/2 teaspoon garlic powder" },
        { ingredient: "1/4 teaspoon salt" },
        { ingredient: "1/4 teaspoon black pepper" },
        { ingredient: "1 bunch asparagus, trimmed" },
        { ingredient: "1 lemon, sliced" }
      ],
      instructions: [
        { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
        { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
        { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
        { instruction: "Top with lemon slices." },
        { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
      ],
      tips: [
        { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
        { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
        { tip: "Serve with rice or quinoa for a complete meal." }
      ],
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
      time: "Brunch",
      recipeId: 22,
      prepTime: 10,
      time: "Brunch",
      cookTime: 20,
      totalTime: 30,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'chinese',
        label: 'Chinese'
      },
      ingredients: [
        { ingredient: "2 boneless, skinless chicken breasts" },
        { ingredient: "1 tablespoon olive oil" },
        { ingredient: "1 teaspoon dried oregano" },
        { ingredient: "1/2 teaspoon garlic powder" },
        { ingredient: "1/4 teaspoon salt" },
        { ingredient: "1/4 teaspoon black pepper" },
        { ingredient: "1 bunch asparagus, trimmed" },
        { ingredient: "1 lemon, sliced" }
      ],
      instructions: [
        { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
        { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
        { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
        { instruction: "Top with lemon slices." },
        { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
      ],
      tips: [
        { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
        { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
        { tip: "Serve with rice or quinoa for a complete meal." }
      ],
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
      time: "Lunch",
      rating: 5,
      recipeId: 23,
      time: "Lunch",
      prepTime: 10,
      cookTime: 20,
      totalTime: 30,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'chinese',
        label: 'Chinese'
      },
      ingredients: [
        { ingredient: "2 boneless, skinless chicken breasts" },
        { ingredient: "1 tablespoon olive oil" },
        { ingredient: "1 teaspoon dried oregano" },
        { ingredient: "1/2 teaspoon garlic powder" },
        { ingredient: "1/4 teaspoon salt" },
        { ingredient: "1/4 teaspoon black pepper" },
        { ingredient: "1 bunch asparagus, trimmed" },
        { ingredient: "1 lemon, sliced" }
      ],
      instructions: [
        { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
        { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
        { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
        { instruction: "Top with lemon slices." },
        { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
      ],
      tips: [
        { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
        { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
        { tip: "Serve with rice or quinoa for a complete meal." }
      ],
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
      time: "Dinner",
      recipeId: 24,
      prepTime: 10,
      time: "Dinner",
      cookTime: 20,
      totalTime: 30,
      imageUrl: './../../../../assets/political.png',
      place: {
        value: 'chinese',
        label: 'Chinese'
      },
      ingredients: [
        { ingredient: "2 boneless, skinless chicken breasts" },
        { ingredient: "1 tablespoon olive oil" },
        { ingredient: "1 teaspoon dried oregano" },
        { ingredient: "1/2 teaspoon garlic powder" },
        { ingredient: "1/4 teaspoon salt" },
        { ingredient: "1/4 teaspoon black pepper" },
        { ingredient: "1 bunch asparagus, trimmed" },
        { ingredient: "1 lemon, sliced" }
      ],
      instructions: [
        { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
        { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
        { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
        { instruction: "Top with lemon slices." },
        { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
      ],
      tips: [
        { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
        { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
        { tip: "Serve with rice or quinoa for a complete meal." }
      ],
      comments: [{
        sender: 'samsicker',
        text: 'A quick and easy recipe for a weeknight meal.'
      }],
      owner: 'junior',
      isFavourited: false,
    },
  ]




}





