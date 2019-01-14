import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ScheduleService} from '../../../shared/services/schedule/schedule.service';
import {Store} from 'store';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe()
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date){
       console.log(date);
  }

}
