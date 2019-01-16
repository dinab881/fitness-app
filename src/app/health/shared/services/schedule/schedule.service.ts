import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Store} from 'store';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Meal} from '../meals/meals.service';
import {Workout} from '../workouts/workouts.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from '../../../../auth/shared/services/auth.service';

// SECTIONS:3
export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp: number;
  $key?: string;
}

// SECTIONS:5 - Firebase will return
export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any;
}

@Injectable()
export class ScheduleService {
  // BehaviorSubject here - allows us to initialize with a new  piece of data
  private section$ = new Subject();
  private date$ = new BehaviorSubject(new Date());
  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      const id = section.data.$key;
      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    })
  );

  selected$ = this.section$
    .pipe(
      tap((next: any) => this.store.set('selected', next))
    );

   // to retrieve workouts/meals for set week  and day.
  //  Any time date changes with our BehaviorSubject, our schedule is going
  // to be notified

 // CONTROLS
  schedule$: Observable<ScheduleItem[]> = this.date$.pipe(
    tap((next: any) => this.store.set('date', next)),

    // SECTIONS:10
    map((day: any) => {
      // anytime we update date the date we want to go to firebase and make request
      // between specific timestamp. For this we need startAt and endAt
      const startAt = (new Date(day.getFullYear(), day.getMonth(), day.getDate())).getTime();
      const endAt = (new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)).getTime() - 1;

      return {startAt, endAt};
    }),
    switchMap(({startAt, endAt}: any) => this.getSchedule(startAt, endAt)),
    map((data: any) => {
        const mapped: ScheduleList = {};
        for (const prop of data) {
          if (!mapped[prop.section]) {
            mapped[prop.section] = prop;
          }
        }
        return mapped;
      }
    ),
    tap((next: any) => this.store.set('schedule', next))
  );

  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => this.store.set('list', next))
  );


  constructor(
    private store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
  }

  // CONTROLS - set new value in date$ BehaviourSubject when clicking on controls
  updateDate(date: Date) {
    this.date$.next(date);
  }

  // SECTIONS:12
  get uid() {
    return this.authService.user.uid;
  }

  // SECTIONS:11
  private getSchedule(startAt: number, endAt: number) {
    // firebase
    return this.db.list(`schedule/${this.uid}`, ref => ref
      .orderByChild('timestamp')
      .startAt(startAt)
      .endAt(endAt))
      .valueChanges();
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }

  private createSection(payload: ScheduleItem) {
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }
}
