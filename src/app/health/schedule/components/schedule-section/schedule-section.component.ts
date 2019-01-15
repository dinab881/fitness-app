import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScheduleItem} from '../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleSectionComponent implements OnInit {
  @Input()
  name: string;

  @Input()
  section: ScheduleItem;

  @Output()
  select = new EventEmitter<any>();

  onSelect(type: string, assigned: string[] = []){
    const data = this.section;
   /* console.log(data);
    console.log('type', type);
    console.log('assigned', assigned);*/
    this.select.emit({
      type,
      assigned,
      data
    });
  }


  constructor() { }

  ngOnInit() {
  }

}
