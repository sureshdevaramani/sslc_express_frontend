import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import {NgxImageCompressService} from 'ngx-image-compress';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CountdownModule } from 'ngx-countdown';
//import { CountdownTimerModule } from 'ngx-countdown-timer';

//import {NgCompressSample} from './app/ng-compress-sample';

import { MaterialModule } from './material-module';
import { LoginComponent } from './Components/login/login.component';
import { TestComponent } from './Components/test/test.component';
import { ImageUploadComponent } from './Components/image-upload/image-upload.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TestResultComponent } from './Components/test-result/test-result.component';
import { TakeTestComponent } from './Components/take-test/take-test.component';

@NgModule({ 
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    ImageUploadComponent,
    NavBarComponent,
    TestResultComponent,
    TakeTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule,
    HttpClientModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterialFileInputModule,
    CountdownModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
