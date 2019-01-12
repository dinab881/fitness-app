import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from 'store';
import {AuthService, User} from '../../auth/shared/services/auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  subscription: Subscription;


  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }

}
