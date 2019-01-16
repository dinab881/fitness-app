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
  list$: Observable<Meal[] | Workout[]>;
  open = false;

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.date$ = this.store.select('date');

    // SECTIONS:7
    this.schedule$ = this.store.select('schedule');

    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
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

  changeSection(event: any){
    this.open = true;
    console.log(event);
    this.scheduleService.selectSection(event);
  }

  closeAssign(){
    this.open = false;
  }

  assignItem(items: string[]){
    this.scheduleService.updateItems(items);
    this.closeAssign();

  }

}
