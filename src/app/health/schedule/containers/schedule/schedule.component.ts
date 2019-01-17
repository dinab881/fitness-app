import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ScheduleItem, ScheduleService} from '../../../shared/services/schedule/schedule.service';
import {Store} from 'store';
import {Meal, MealsService} from '../../../shared/services/meals/meals.service';
import {Workout, WorkoutsService} from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  subscriptions: Subscription[] = [];

  // SECTIONS:6
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  // ASSIGN:5
  list$: Observable<Meal[] | Workout[]>;
  // ASSIGN:14
  open = false;

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    // ASSIGN:6
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
    // end  ASSIGN:6
  ) {}

  ngOnInit() {
    this.date$ = this.store.select('date');

    // SECTIONS:7
    this.schedule$ = this.store.select('schedule');
    // ASSIGN:3
    this.selected$ = this.store.select('selected');
    // ASSIGN:11
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),

      // SECTIONS:26
      this.scheduleService.selected$.subscribe(),
      // ASSIGN:4
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      // ASSIGN:7
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe()
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // CONTROLS: set new value in date$ BehaviourSubject when clicking on controls
  // DAYS:  set new value in date$ BehaviourSubject when clicking on days array
  changeDate(date: Date){
    this.scheduleService.updateDate(date);
  }

  // SECTIONS:21
  changeSection(event: any){
    // ASSIGN:15
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  // ASSIGN:22
  closeAssign(){
    this.open = false;
  }

  // ASSIGN:23
  assignItem(items: string[]){
    this.scheduleService.updateItems(items);
    this.closeAssign();

  }

}
