import {Injectable} from '@angular/core';
import {AuthService} from '../../../../auth/shared/services/auth.service';
import {Store} from 'src/store';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable, of} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

export interface Workout {
  name: string;
  type: string; // endurance | strength
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class WorkoutsService {
  workouts$: Observable<any[]> = this.db.list(`workouts/${this.uid}`).snapshotChanges()
    .pipe(map(changes => {
      console.log(changes);
      return changes.map(c => ({
        $key: c.payload.key, ...c.payload.val()
      }));
    }),
      tap(next => this.store.set('workouts', next)));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string){
    if (!key) {
      return of({});
    }
     return this.store.select<Workout[]>('workouts')
      .pipe(
        filter(Boolean),
        map(workouts => workouts.find((workout: Workout) => workout.$key === key))
      );
  }

  addWorkout(workout: Workout){
    return this.db.list(`workouts/${this.uid}`).push(workout);

  }

  updateWorkout(key: string, workout: Workout){
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string){
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
