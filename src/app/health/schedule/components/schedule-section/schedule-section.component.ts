import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScheduleItem} from '../../../shared/services/schedule/schedule.service';

// SECTIONS:14 - create component schedule-section
@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleSectionComponent implements OnInit {
  // SECTIONS:15
  @Input()
  name: string;

  // SECTIONS:16
  @Input()
  section: ScheduleItem;

  // SECTIONS:17
  @Output()
  select = new EventEmitter<any>();

  // SECTIONS:18
  onSelect(type: string, assigned: string[] = []){
    const data = this.section;
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
