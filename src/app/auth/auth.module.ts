import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// shared modules
import {SharedModule} from './shared/shared.module';

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDAXuPY1-xkg8zocsGBQd_orIjaptgs5fI",
  authDomain: "fitnessapp-64dc4.firebaseapp.com",
  databaseURL: "https://fitnessapp-64dc4.firebaseio.com",
  projectId: "fitnessapp-64dc4",
  storageBucket: "",
  messagingSenderId: "224799351924"
};

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule'},
      { path: 'register', loadChildren: './register/register.module#RegisterModule'}
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: []
})
export class AuthModule { }
