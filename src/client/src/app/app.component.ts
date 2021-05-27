import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { IUser } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Zemoga JsShoutouts';
  user: IUser;
  isAuthenticated$: Observable<boolean>;
  localAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().subscribe();
    this.authService.user$.subscribe(user => this.user = user);
    this.authService.localAuthentication$.subscribe(localAuth => this.localAuth = localAuth);
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  signIn() {
    window.location.href = `${environment.apiUrl}facebook`;
  }

  logout() {
    this.authService.logout();
  }
}
