import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  user: IUser;
  users$: Observable<any>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.users$ = this.authService.getUsers();
  }
}
