import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './zarchitecture/layout/page404/page404.component';
import { LandingPageComponent } from './zarchitecture/layout/landing-page/landing-page.component';
import { RecipeCardsComponent } from './recipe-management/recipe-cards/recipe-cards.component';
import { ManageSingularRecipeComponent } from './recipe-management/manage-singular-recipe/manage-singular-recipe.component';
import { LoginComponent } from './zarchitecture/layout/login/login.component';
import { CommentsSectionComponent } from './zarchitecture/layout/comments-section/comments-section.component';
import { SingularViewPointComponent } from './recipe-management/singular-view-point/singular-view-point.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    children: [
      {
        path: '',
        redirectTo: "#", pathMatch: "full"
      },
    ]
  },
  {
    path: '#',
    component: LoginComponent,
  },
  {
    path: 'manage/recipe',
    component: ManageSingularRecipeComponent
  },
  // {
  //   path: 'manage',
  //   children: [
  //     {
  //       path: 'recipe',
  //       component: ManageSingularRecipeComponent
  //     },

  //   ]
  // },

  {
    path: 'card',
    component: RecipeCardsComponent,
  },
  {
    path: 'view',
    component: SingularViewPointComponent,
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
