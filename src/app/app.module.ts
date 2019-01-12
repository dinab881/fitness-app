import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';
import {Store} from 'store';
/* Feature module */
import {AuthModule} from './auth/auth.module';
import {Routes} from '@angular/router';


export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [{}]
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 var config = {
    apiKey: "AIzaSyDAXuPY1-xkg8zocsGBQd_orIjaptgs5fI",
    authDomain: "fitnessapp-64dc4.firebaseapp.com",
    databaseURL: "https://fitnessapp-64dc4.firebaseio.com",
    projectId: "fitnessapp-64dc4",
    storageBucket: "",
    messagingSenderId: "224799351924"
  };
 firebase.initializeApp(config);
 */
