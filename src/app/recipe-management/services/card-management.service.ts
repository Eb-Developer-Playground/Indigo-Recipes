import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../../assets/db-arrays/interfaces';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CardManagementService {


  serverUrl: String = `${environment.baseUrl}/ap1/v1/recipes`;

  private recipes: Recipe[] = [];
  username: string | null;
  filteredPlace: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.username = localStorage.getItem('username');
  }


  /********* Post a new recipe */
  // postNewRecipe(recipe: Recipe): void {
  //   const newId = Math.random() * 1000;
  //   recipe.recipeId = newId;
  //   recipe.owner = this.username;
  //   recipe.isFavourited = false;
  //   const newRecipes: Recipe[] = [...this.recipes];
  //   newRecipes.push(recipe);
  //   for (let recipeItem of this.recipeSample) {
  //     newRecipes.push(recipeItem);
  //   }

  //   this.recipes = newRecipes

  //   console.log("Updated recipes array:", newRecipes);

  // }

  /***** Fetch based on cuisine */
  getCuisineRecipes(placeLabel: string): void {
    this.filteredPlace = this.filterRecipesByPlace(this.recipes, placeLabel);

  }
  filterRecipesByPlace(recipes: Recipe[], placeLabel: string): Recipe[] {
    console.log("RECIPES:::", this.recipes);

    return recipes.filter(recipe => recipe.place === placeLabel);
  }





  /***********************************************************************************************************
   * Server integration
   */
  postNewRecipe(recipeDetails: any): Observable<any>{
    console.log("RECIPE DETAILSSSS:::", recipeDetails);    
    const url = `${this.serverUrl}/post`;
    return this._http.post<any>(url, recipeDetails);
  }

  fetchAllRecipes(): Observable<any> {
    const url = `${this.serverUrl}/get/all`;
    return this._http.get<any>(url);
  }

  fetchFavRecipes(): Observable<any>{
    const url = `${this.serverUrl}/get/favRecipes`;
    return this._http.get<any>(url);
  }

  fetchNewRecipes(): Observable<any>{
    const url = `${this.serverUrl}/get/newRecipes`;
    return this._http.get<any>(url);
  }

  fetchMyRecipes(): Observable<any> {
    const url = `${this.serverUrl}/get/myRecipes`;
    return this._http.get<any>(url);
  }

  searchRecipeById(params: any): Observable<any>{
    const url = `${this.serverUrl}/get/id`;
    return this._http.get<any>(url,{params: params});
  }

  updateRecipe(recipeDetails: any): Observable<any>{
    const url = `${this.serverUrl}/update`;
    return this._http.put<any>(url, recipeDetails)
  }

  /***********************************************************************************************************
   * Sample Recipes
   */


  // recipeSample: Recipe[] = [];
  recipeSample: Recipe[] = [
    {
      title: 'Ugali Mayai',
      yield: 4,
      rating: 4,
      prepTime: 20,
      cookTime: 30,
      totalTime: 50,
      id: 0,
      time: "Breakfast",
      imageUrl: './../../../../assets/political.png',
      place: "African",
      ingredients: [
        "2 boneless, skinless chicken breasts" ,
        "1 tablespoon olive oil" ,
        "1 teaspoon dried oregano" ,
        "1/2 teaspoon garlic powder" ,
        "1/4 teaspoon salt" ,
        "1/4 teaspoon black pepper" ,
        "1 bunch asparagus, trimmed" ,
        "1 lemon, sliced",
      ],
      instructions: [
        "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." ,
        "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." ,
        "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." ,
        "Top with lemon slices." ,
        "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp",
      ],
      tips: [
        "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." ,
        "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." ,
        "Serve with rice or quinoa for a complete meal.",
      ],
      comments: [{
        sender: 'samsicker',
        text: 'This recipe was delicious! I loved the flavor combinations.'
      }],
      owner: 'junior',
      isFavourited: true,
    },
    // {
    //   title: 'Nduma Omena',
    //   yield: 4,
    //   rating: 5,
    //   time: "Brunch",
    //   recipeId: 20,
    //   prepTime: 20,
    //   cookTime: 30,

    //   totalTime: 50,
    //   imageUrl: './../../../../assets/political.png',
    //   place: {
    //     value: 'african',
    //     label: 'African'
    //   },
    //   ingredients: [
    //     { ingredient: "2 boneless, skinless chicken breasts" },
    //     { ingredient: "1 tablespoon olive oil" },
    //     { ingredient: "1 teaspoon dried oregano" },
    //     { ingredient: "1/2 teaspoon garlic powder" },
    //     { ingredient: "1/4 teaspoon salt" },
    //     { ingredient: "1/4 teaspoon black pepper" },
    //     { ingredient: "1 bunch asparagus, trimmed" },
    //     { ingredient: "1 lemon, sliced" }
    //   ],
    //   instructions: [
    //     { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
    //     { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
    //     { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
    //     { instruction: "Top with lemon slices." },
    //     { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
    //   ],
    //   tips: [
    //     { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
    //     { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
    //     { tip: "Serve with rice or quinoa for a complete meal." }
    //   ],
    //   comments: [{
    //     sender: 'samsicker',
    //     text: 'This recipe was delicious! I loved the flavor combinations.'
    //   }],
    //   owner: 'junior',
    //   isFavourited: true,
    // },
    // {
    //   title: 'Pizza',
    //   yield: 6,
    //   rating: 2,
    //   time: "Dinner",
    //   recipeId: 2,

    //   prepTime: 15,
    //   cookTime: 40,
    //   totalTime: 55,
    //   imageUrl: './../../../../assets/political.png',
    //   place: {
    //     value: 'Italian',
    //     label: 'Italian'
    //   },
    //   ingredients: [
    //     { ingredient: "2 boneless, skinless chicken breasts" },
    //     { ingredient: "1 tablespoon olive oil" },
    //     { ingredient: "1 teaspoon dried oregano" },
    //     { ingredient: "1/2 teaspoon garlic powder" },
    //     { ingredient: "1/4 teaspoon salt" },
    //     { ingredient: "1/4 teaspoon black pepper" },
    //     { ingredient: "1 bunch asparagus, trimmed" },
    //     { ingredient: "1 lemon, sliced" }
    //   ],
    //   instructions: [
    //     { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
    //     { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
    //     { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
    //     { instruction: "Top with lemon slices." },
    //     { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
    //   ],
    //   tips: [
    //     { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
    //     { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
    //     { tip: "Serve with rice or quinoa for a complete meal." }
    //   ],
    //   comments: [{
    //     sender: 'kamaa',
    //     text: 'This recipe was easy to follow and turned out great!'
    //   }],
    //   owner: 'samsicker',
    //   isFavourited: false,
    // },
    // {
    //   title: 'Matumbo',
    //   yield: 2,
    //   time: "Lunch",
    //   rating: 1,
    //   recipeId: 12,
    //   prepTime: 10,

    //   cookTime: 20,
    //   totalTime: 30,
    //   imageUrl: './../../../../assets/political.png',
    //   place: {
    //     value: 'chinese',
    //     label: 'Chinese'
    //   },
    //   ingredients: [
    //     { ingredient: "2 boneless, skinless chicken breasts" },
    //     { ingredient: "1 tablespoon olive oil" },
    //     { ingredient: "1 teaspoon dried oregano" },
    //     { ingredient: "1/2 teaspoon garlic powder" },
    //     { ingredient: "1/4 teaspoon salt" },
    //     { ingredient: "1/4 teaspoon black pepper" },
    //     { ingredient: "1 bunch asparagus, trimmed" },
    //     { ingredient: "1 lemon, sliced" }
    //   ],
    //   instructions: [
    //     { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
    //     { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
    //     { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
    //     { instruction: "Top with lemon slices." },
    //     { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
    //   ],
    //   tips: [
    //     { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
    //     { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
    //     { tip: "Serve with rice or quinoa for a complete meal." }
    //   ],
    //   comments: [{
    //     sender: 'junior',
    //     text: 'Needs more flavor. I will try adding some additional spices next time.'
    //   }],
    //   owner: 'kamaa',
    //   isFavourited: true,
    // },
    // {
    //   title: 'Chapo Waru',
    //   yield: 2,
    //   rating: 4,
    //   time: "Breakfast",
    //   recipeId: 21,
    //   prepTime: 10,

    //   cookTime: 20,
    //   totalTime: 30,
    //   imageUrl: './../../../../assets/political.png',
    //   place: {
    //     value: 'chinese',
    //     label: 'Chinese'
    //   },
    //   ingredients: [
    //     { ingredient: "2 boneless, skinless chicken breasts" },
    //     { ingredient: "1 tablespoon olive oil" },
    //     { ingredient: "1 teaspoon dried oregano" },
    //     { ingredient: "1/2 teaspoon garlic powder" },
    //     { ingredient: "1/4 teaspoon salt" },
    //     { ingredient: "1/4 teaspoon black pepper" },
    //     { ingredient: "1 bunch asparagus, trimmed" },
    //     { ingredient: "1 lemon, sliced" }
    //   ],
    //   instructions: [
    //     { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
    //     { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
    //     { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
    //     { instruction: "Top with lemon slices." },
    //     { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
    //   ],
    //   tips: [
    //     { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
    //     { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
    //     { tip: "Serve with rice or quinoa for a complete meal." }
    //   ],
    //   comments: [{
    //     sender: 'junior',
    //     text: 'Needs more flavor. I will try adding some additional spices next time.'
    //   }],
    //   owner: 'kamaa',
    //   isFavourited: true,
    // },

    // {
    //   title: 'Minji Stew',
    //   yield: 2,
    //   rating: 3,
    //   time: "Brunch",
    //   recipeId: 22,
    //   prepTime: 10,

    //   cookTime: 20,
    //   totalTime: 30,
    //   imageUrl: './../../../../assets/political.png',
    //   place: {
    //     value: 'chinese',
    //     label: 'Chinese'
    //   },
    //   ingredients: [
    //     { ingredient: "2 boneless, skinless chicken breasts" },
    //     { ingredient: "1 tablespoon olive oil" },
    //     { ingredient: "1 teaspoon dried oregano" },
    //     { ingredient: "1/2 teaspoon garlic powder" },
    //     { ingredient: "1/4 teaspoon salt" },
    //     { ingredient: "1/4 teaspoon black pepper" },
    //     { ingredient: "1 bunch asparagus, trimmed" },
    //     { ingredient: "1 lemon, sliced" }
    //   ],
    //   instructions: [
    //     { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
    //     { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
    //     { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
    //     { instruction: "Top with lemon slices." },
    //     { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
    //   ],
    //   tips: [
    //     { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
    //     { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
    //     { tip: "Serve with rice or quinoa for a complete meal." }
    //   ],
    //   comments: [{
    //     sender: 'junior',
    //     text: 'Needs more flavor. I will try adding some additional spices next time.'
    //   }],
    //   owner: 'kamaa',
    //   isFavourited: true,
    // },
    // {
    //   title: 'Nyama Choma',
    //   yield: 2,
    //   time: "Lunch",
    //   rating: 5,
    //   recipeId: 23,

    //   prepTime: 10,
    //   cookTime: 20,
    //   totalTime: 30,
    //   imageUrl: './../../../../assets/political.png',
    //   place: {
    //     value: 'chinese',
    //     label: 'Chinese'
    //   },
    //   ingredients: [
    //     { ingredient: "2 boneless, skinless chicken breasts" },
    //     { ingredient: "1 tablespoon olive oil" },
    //     { ingredient: "1 teaspoon dried oregano" },
    //     { ingredient: "1/2 teaspoon garlic powder" },
    //     { ingredient: "1/4 teaspoon salt" },
    //     { ingredient: "1/4 teaspoon black pepper" },
    //     { ingredient: "1 bunch asparagus, trimmed" },
    //     { ingredient: "1 lemon, sliced" }
    //   ],
    //   instructions: [
    //     { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
    //     { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
    //     { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
    //     { instruction: "Top with lemon slices." },
    //     { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
    //   ],
    //   tips: [
    //     { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
    //     { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
    //     { tip: "Serve with rice or quinoa for a complete meal." }
    //   ],
    //   comments: [{
    //     sender: 'junior',
    //     text: 'Needs more flavor. I will try adding some additional spices next time.'
    //   }],
    //   owner: 'kamaa',
    //   isFavourited: true,
    // },
    // {
    //   title: 'Kuku Boiro',
    //   yield: 2,
    //   rating: 2,
    //   time: "Dinner",
    //   recipeId: 24,
    //   prepTime: 10,

    //   cookTime: 20,
    //   totalTime: 30,
    //   imageUrl: './../../../../assets/political.png',
    //   place: {
    //     value: 'chinese',
    //     label: 'Chinese'
    //   },
    //   ingredients: [
    //     { ingredient: "2 boneless, skinless chicken breasts" },
    //     { ingredient: "1 tablespoon olive oil" },
    //     { ingredient: "1 teaspoon dried oregano" },
    //     { ingredient: "1/2 teaspoon garlic powder" },
    //     { ingredient: "1/4 teaspoon salt" },
    //     { ingredient: "1/4 teaspoon black pepper" },
    //     { ingredient: "1 bunch asparagus, trimmed" },
    //     { ingredient: "1 lemon, sliced" }
    //   ],
    //   instructions: [
    //     { instruction: "Preheat oven to 400°F (200°C). Lightly grease a baking sheet." },
    //     { instruction: "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper." },
    //     { instruction: "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken." },
    //     { instruction: "Top with lemon slices." },
    //     { instruction: "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp" }
    //   ],
    //   tips: [
    //     { tip: "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." },
    //     { tip: "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." },
    //     { tip: "Serve with rice or quinoa for a complete meal." }
    //   ],
    //   comments: [{
    //     sender: 'samsicker',
    //     text: 'A quick and easy recipe for a weeknight meal.'
    //   }],
    //   owner: 'junior',
    //   isFavourited: false,
    // },
  ]




}





