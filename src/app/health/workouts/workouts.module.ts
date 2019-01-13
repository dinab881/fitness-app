import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

// containers
import { WorkoutsComponent } from './containers/workouts/workouts.component';
export const ROUTES: Routes = [
  {path: '', component: WorkoutsComponent}
];

@NgModule({
  declarations: [WorkoutsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class WorkoutsModule { }
