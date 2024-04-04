import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './zarchitecture/layout/page404/page404.component';
import { LandingPageComponent } from './zarchitecture/layout/landing-page/landing-page.component';
import { RecipeCardsComponent } from './recipe-management/recipe-cards/recipe-cards.component';
import { ManageSingularRecipeComponent } from './recipe-management/manage-singular-recipe/manage-singular-recipe.component';
import { SingularViewPointComponent } from './recipe-management/singular-view-point/singular-view-point.component';
import { SigninComponent } from './admin/authentication/signin/signin.component';
import { registrationGuard } from './admin/guards/registration.guard';

const routes: Routes = [
  {
    path: "",
    component: SigninComponent,
    children: [
      {
        path: '',
        redirectTo: "#", pathMatch: "full"
      },
    ]
  },
  {
    path: '#',
    component: SigninComponent,
  },
  {
    path: 'manage/recipe',
    canActivate: [registrationGuard],
    component: ManageSingularRecipeComponent
  },

  {
    path: 'card',
    canActivate: [registrationGuard],
    component: RecipeCardsComponent,
  },
  {
    path: 'view',
    canActivate: [registrationGuard],
    component: SingularViewPointComponent,
  },
  {
    path: 'home',
    canActivate: [registrationGuard],
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
