import {Injectable} from '@angular/core';
import {AuthService} from '../../../auth/shared/services/auth.service';
import {Store} from 'store';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable, of} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {
  meals$: Observable<any[]> = this.db.list(`meals/${this.uid}`).snapshotChanges()
    .pipe(map(changes => {
      console.log(changes);
      return changes.map(c => ({
        $key: c.payload.key, ...c.payload.val()
      }));
    })
     ,
      tap(next => this.store.set('meals', next)));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  getMeal(key: string){
    if (!key) {
      return of({});
    }
    return this.store.select<Meal[]>('meals')
      .pipe(filter(Boolean), map(meals => {
        meals.find((meal: Meal) => meal.$key === key);
      }));
  }

  addMeal(meal: Meal){
    return this.db.list(`meals/${this.uid}`).push(meal);

  }

  removeMeal(key: string){
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
