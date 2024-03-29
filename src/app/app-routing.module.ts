import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './zarchitecture/layout/page404/page404.component';
import { LandingPageComponent } from './zarchitecture/layout/landing-page/landing-page.component';
import { RecipeCardsComponent } from './recipe-management/recipe-cards/recipe-cards.component';
import { ManageSingularRecipeComponent } from './recipe-management/manage-singular-recipe/manage-singular-recipe.component';

const routes: Routes = [
  {
    path: "",
    component: ManageSingularRecipeComponent,
    children: [
      {
        path: '',
        redirectTo: "home", pathMatch: "full"
      },
      {
        path: 'card',
        component: RecipeCardsComponent,
      }
    ]
  },
  {
    path: 'home',
    component: LandingPageComponent
  },


  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
