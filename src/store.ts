import { Observable, BehaviorSubject  } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import {User} from './app/auth/shared/services/auth.service';
import {Meal} from './app/health/shared/services/meals/meals.service';
import {Workout} from './app/health/shared/services/workouts/workouts.service';
import {ScheduleItem} from './app/health/shared/services/schedule/schedule.service';

export interface State {
  user: User;
  meals: Meal[];
  // SECTIONS:27
  selected: any;
  // ASSIGN:9
  list: any;
  // SECTIONS:8
  schedule: ScheduleItem[];
  date: Date;
  workouts: Workout[];
  [key: string]: any;
}

const state: State = {
  user: undefined,
  // SECTIONS:28
  selected: undefined,
  // ASSIGN:10
  list: undefined,
  meals: undefined,
  // SECTIONS:9
  schedule: undefined,
  workouts: undefined,
  date: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
