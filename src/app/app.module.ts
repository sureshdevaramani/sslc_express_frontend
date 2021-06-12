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

//import {NgCompressSample} from './app/ng-compress-sample';

import { MaterialModule } from './material-module';
import { LoginComponent } from './Components/login/login.component';
import { TestComponent } from './Components/test/test.component';
import { ImageUploadComponent } from './Components/image-upload/image-upload.component';

@NgModule({ 
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    ImageUploadComponent
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
    MaterialModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
