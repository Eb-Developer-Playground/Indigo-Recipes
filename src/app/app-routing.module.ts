import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './zarchitecture/layout/login/login.component';
import { Page404Component } from './zarchitecture/layout/page404/page404.component';
import { HeaderComponent } from './zarchitecture/layout/header/header.component';
import { LandingPageComponent } from './zarchitecture/layout/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component:  LandingPageComponent,
    children: [
      // {
      //   path: '',
      //   component: LandingPageComponent
      // }
    ]
  },
  {
    path: '#',
    component: LoginComponent
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
