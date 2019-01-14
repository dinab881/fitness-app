import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// components
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';

// containers
import { ScheduleComponent } from './containers/schedule/schedule.component';
import {ReactiveFormsModule} from '@angular/forms';


export const ROUTES: Routes = [
  {path: '', component: ScheduleComponent}
];

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleDaysComponent,
    ScheduleControlsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ScheduleModule { }
