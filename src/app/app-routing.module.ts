import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './zarchitecture/layout/login/login.component';
import { Page404Component } from './zarchitecture/layout/page404/page404.component';
import { HeaderComponent } from './zarchitecture/layout/header/header.component';
import { LandingPageComponent } from './zarchitecture/layout/landing-page/landing-page.component';
import { RecipeCardsComponent } from './recipe-management/recipe-cards/recipe-cards.component';

const routes: Routes = [
  {
    path: "",
    component: RecipeCardsComponent,
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
