import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../assets/db-arrays/interfaces';
import { FooterComponent } from '../../architecture/layout/footer/footer.component';
import { HeaderComponent } from '../../architecture/layout/header/header.component';
import { SharedModule } from '../../architecture/shared/shared/shared.module';
import { CardManagementService } from '../services/card-management.service';


@Component({
  selector: 'app-singular-view-point',
  standalone: true,
  imports: [
    SharedModule,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './singular-view-point.component.html',
  styleUrl: './singular-view-point.component.scss'
})
export class SingularViewPointComponent implements OnInit {

  // @Input() recipe!: Recipe;
  sampleRecipe!: Recipe;
  selectedRecipe!: Recipe;


  constructor(
    private cardManService: CardManagementService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    // this.selectedRecipe = this.recipe
    if (this.route.queryParams) {
      this.route.queryParams.subscribe({
        next: (params) => {
          if (params.hasOwnProperty('data')) {
            const routeData = JSON.parse(params['data']);
            console.log("routeData", routeData);
            console.log("RECIPE RETRIEVED", this.cardManService.recipeSample);
            // const selectedCard = this.searchRecipesById(this.cardManService.recipeSample, routeData)[0]
            // this.selectedRecipe = selectedCard

          }
        }
      })
    }
  }

  // searchRecipesById(recipes: Recipe[], searchTerm: number): Recipe[] {
  //   return recipes.filter(recipe => recipe.recipeId === searchTerm);
  // }

  /*************************************************************************************** */

  recipe: Recipe = {
    title: "One-Pan Lemon Garlic Chicken with Roasted Asparagus",
    // imageUrl: "https://via.placeholder.com/300", 
    imageUrl: "./../../../../assets/political.png",
    yield: 4,
    prepTime: 10,
    // recipeCode: "",
    id: 0,
    cookTime: 25,
    totalTime: 35,
    time: "Breakfast",
    rating: 3,
    place: "African",
    comments: [],
    ingredients: [
      "2 boneless, skinless chicken breasts",
      "1 tablespoon olive oil",
      "1 teaspoon dried oregano",
      "1/2 teaspoon garlic powder",
      "1/4 teaspoon salt",
      "1/4 teaspoon black pepper",
      "1 bunch asparagus, trimmed",
      "1 lemon, sliced"
    ],
    instructions: [
       "Preheat oven to 400°F (200°C). Lightly grease a baking sheet.",
       "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper.",
       "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken.",
      "Top with lemon slices." ,
       "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp"
    ],
    tips: [
      "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking." ,
      "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers." ,
      "Serve with rice or quinoa for a complete meal." 
    ]
  };


  backgroundImageUrl: string = this.recipe.imageUrl

}
