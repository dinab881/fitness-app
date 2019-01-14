import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Store} from 'store';
import {tap} from 'rxjs/operators';

@Injectable()
export class ScheduleService {
  private date$ =  new BehaviorSubject(new Date());
  schedule$: Observable<any[]> = this.date$.pipe(tap((next: any) => this.store.set('date', next) ));


  constructor(
    private store: Store
  ) { }
}
