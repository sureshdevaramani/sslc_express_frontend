import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Components/login/login.component';
import { TestComponent } from './Components/test/test.component';
import { ImageUploadComponent } from './Components/image-upload/image-upload.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'test', component:TestComponent},
  { path: 'imageUpload', component:ImageUploadComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
