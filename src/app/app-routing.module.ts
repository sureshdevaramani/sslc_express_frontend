import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Components/login/login.component';
import { TestComponent } from './Components/test/test.component';
import { ImageUploadComponent } from './Components/image-upload/image-upload.component';
import { TestResultComponent } from './Components/test-result/test-result.component';
import { TakeTestComponent } from './Components/take-test/take-test.component';
import { LogoutComponent } from './Components/logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
  { path: 'imageUpload', component: ImageUploadComponent },
  { path: 'testResult', component: TestResultComponent },
  { path: 'takeTest/:testId', component: TakeTestComponent },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
