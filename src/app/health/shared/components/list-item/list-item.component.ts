import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {

  toggled = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  constructor() { }

  toggle(){
    this.toggled = !this.toggled;
  }

  removeItem(){
    this.remove.emit(this.item);
  }

  ngOnInit() {
  }

  getRoute(item: any){
    return [`../meals`, item.$key];
  }

}
