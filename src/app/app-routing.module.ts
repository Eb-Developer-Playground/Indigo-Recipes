import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './zarchitecture/layout/login/login.component';
import { Page404Component } from './zarchitecture/layout/page404/page404.component';
import { HeaderComponent } from './zarchitecture/layout/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent
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
