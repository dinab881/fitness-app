import {Component, OnDestroy, OnInit} from '@angular/core';
import {Meal, MealsService} from '../../../shared/services/meals/meals.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from 'store';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private mealsService: MealsService
  ) {
  }

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMeal(event: Meal) {
    this.mealsService.removeMeal(event.$key);
  }

}
