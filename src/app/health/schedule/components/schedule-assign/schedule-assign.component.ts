import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Workout} from '../../../shared/services/workouts/workouts.service';
import {Meal} from '../../../shared/services/meals/meals.service';

// ASSIGN:2 -create component assign
@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent implements OnInit {
  // ASSIGN:16
  private selected: string[] = [];
  // ASSIGN:11
  @Input()
  section: any;

  // ASSIGN:12
  @Input()
  list: Meal[] | Workout[];

  // ASSIGN:17
  @Output()
  update = new EventEmitter<any>();

  // ASSIGN:18
  @Output()
  cancel = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    // ASSIGN:15
    this.selected = [...this.section.assigned];
  }

  // ASSIGN:13
  getRoute(name: string) {
    return [`../${name}/new`];
  }

  // ASSIGN:14
  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

 // ASSIGN:19
  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  // ASSIGN:20
  cancelAssign() {
    this.cancel.emit();
  }

  // ASSIGN:21
  toggleItem(name: string) {
    console.log('ASSIGN selected start', this.selected);
    if (this.exists(name)) {
      // similar to splice accept we are using immutable objects to return new collection to this.selected
      this.selected = this.selected.filter(item => item !== name);
    } else {
      // similar to push accept we are using immutable objects to return new collection to this.selected
      this.selected = [...this.selected, name];
    }
    console.log('ASSIGN selected end', this.selected);

  }

}
