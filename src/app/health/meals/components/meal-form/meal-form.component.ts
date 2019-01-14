import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormArray, FormGroup, Validators, FormControl} from '@angular/forms';
import {Meal} from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnInit, OnChanges {
  toggled = false;
  exists =  false;

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();


  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.meal && this.meal.name){
      this.exists = true;
      const value = this.meal;
      this.form.patchValue(value);

      this.emptyIngredients();

      if(value.ingredients){
        for(const item of value.ingredients){
          this.ingredients.push(this.fb.control(item));
        }
      }
    }
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal(){
    if(this.form.valid){
      this.update.emit(this.form.value);
    }
  }

  removeMeal(){
    this.remove.emit(this.form.value);
  }

  toggle(){
    this.toggled = !this.toggled;
  }

  emptyIngredients(){
    while(this.ingredients.controls.length){
     this.ingredients.removeAt(0);
    }
  }

}
