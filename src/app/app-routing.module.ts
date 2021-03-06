import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Components/login/login.component';
import { TestComponent } from './Components/test/test.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'test', component:TestComponent},
  { path: 'home', loadChildren: ()=> import('./modules/home/home.module').then(m => m.HomeModule)  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
