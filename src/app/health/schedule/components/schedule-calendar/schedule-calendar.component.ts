import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ScheduleItem, ScheduleList} from '../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {
  selectedDay: Date;
  selectedDayIndex: number;
  selectedWeek: Date;

  sections = [
    {key: 'morning', name: 'Morning'},
    {key: 'lunch', name: 'Lunch'},
    {key: 'evening', name: 'Evening'},
    {key: 'snacks', name: 'Snacks and drinks'},

  ];

  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Input()
  items: ScheduleList;

  @Output()
  change = new EventEmitter<Date>();

  @Output()
  select = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    console.log('OnInit selectedDayIndex', this.selectedDayIndex);
    console.log('OnInit selectedDay', this.selectedDay);
    console.log('OnInit selectedWeek', this.selectedWeek);
  }

  ngOnChanges() {

    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    console.log('OnOnChanges selectedDayIndex', this.selectedDayIndex);
    console.log('OnOnChanges selectedDay', this.selectedDay);

  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  /* set start of week on controls */
  onChange(weekOffset: number) {
    console.log('weekoffset', weekOffset);

    // start of week for current date (not changes with control's click)
    const startOfWeek = this.getStartOfWeek(new Date());

    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  getSection(name: string): ScheduleItem {
    return this.items && this.items[name] || {};
  }

  selectSection({type, assigned, data}: any, section: string) {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    });
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));

  }

  private getToday(date: Date) {
    console.log('here2', date.getDay());
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    console.log('here', today);
    return today;
  }



}
