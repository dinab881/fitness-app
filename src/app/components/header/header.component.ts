import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../auth/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  logout =  new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  logoutUser(){
    this.logout.emit();
  }

}
