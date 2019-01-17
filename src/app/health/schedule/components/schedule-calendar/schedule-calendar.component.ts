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

  // SECTIONS:1 set sections array
  sections = [
    {key: 'morning', name: 'Morning'},
    {key: 'lunch', name: 'Lunch'},
    {key: 'evening', name: 'Evening'},
    {key: 'snacks', name: 'Snacks and drinks'},

  ];

  // CONTROLS
  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  // SECTIONS:4
  @Input()
  items: ScheduleList;

  // CONTROLS, DAYS (on click on particular day of week?)
  @Output()
  change = new EventEmitter<Date>();

  // SECTIONS:20
  @Output()
  select = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    /*console.log('OnInit selectedDayIndex', this.selectedDayIndex);
    console.log('OnInit selectedDay', this.selectedDay);
    console.log('OnInit selectedWeek', this.selectedWeek);*/
  }

  // DAYS - get fired every time new date actually changes
  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));

    console.log('===================');
    console.log('***DAYS***: selectedDay', this.selectedDay);
    console.log('***DAYS***: selectedDayIndex', this.selectedDayIndex);
    console.log('***DAYS***: selectedWeek', this.selectedWeek);
    console.log('===================');
  }

  // DAYS: set new selectedDay when clicking on days of week
  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  /*
     CONTROLS:
     calculate start date of next or previous week (click on controls arrows)
  */
  onChange(weekOffset: number) {
    console.log('===================');
    console.log('***CONTROLS***: weekoffset', weekOffset);

    // start of week for current date (not changes with control's click)
    const startOfWeek = this.getStartOfWeek(new Date());
    console.log('***CONTROLS***: startOfWeek', startOfWeek);

    // start date for the next particular week - remove time  - set it to 00:00:00 from startOfWeek
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    console.log('***CONTROLS***: startDate without weekoffset', startDate);
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    console.log('***CONTROLS***: startDate with weekoffset', startDate);
    console.log('===================');
    this.change.emit(startDate);
  }

  /* SECTIONS:2 */
  getSection(name: string): ScheduleItem {
    return this.items && this.items[name] || {};
  }

  /* SECTIONS:19 */
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

  // CONTROLS, DAYS
  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));

  }

  // DAYS:
  // Sunday is 0, Monday is 1, and so on.
  // We do -1 to change js day index to index of days array
  // days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  // if we clicked on controls - it chooses Monday as start
  private getToday(date: Date) {
    console.log('DAYS: day of selectedDay', date.getDay());
    let today = date.getDay() - 1;
    console.log('DAYS: today (day of selectedDay - 1)', today);
    if (today < 0) {
      today = 6;
    }
    return today;
  }


}
