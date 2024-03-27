import { Component, Input } from '@angular/core';
import { SharedModule } from '../../zarchitecture/shared/shared/shared.module';
import { HeaderComponent } from '../../zarchitecture/layout/header/header.component';
import { FooterComponent } from '../../zarchitecture/layout/footer/footer.component';

interface Recipe {
  title: string;
  imageUrl: string;
  yield: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  ingredients: string[];
  instructions: string[];
  tips: string [];
}


@Component({
  selector: 'app-secondary-view-point',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './secondary-view-point.component.html',
  styleUrl: './secondary-view-point.component.scss'
})
export class SecondaryViewPointComponent {
  // @Input() recipe!: Recipe;

   recipe: Recipe = {
    title: "One-Pan Lemon Garlic Chicken with Roasted Asparagus",
    imageUrl: "", // You can add an image URL here!
    yield: "4 servings",
    prepTime: "10 minutes",
    cookTime: "25 minutes",
    totalTime: "35 minutes",
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
      "Top with lemon slices.",
      "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp."
    ],
    tips: [
      "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking.",
      "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers.",
      "Serve with rice or quinoa for a complete meal."
    ]
  };

}
