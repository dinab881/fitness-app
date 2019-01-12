import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import {Store} from 'store';
import {Routes} from '@angular/router';

/* Feature module */
import {AuthModule} from './auth/auth.module';

/* Containers */
import { AppComponent } from './containers/app/app.component';

/* Components */
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';


export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [{}]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
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

