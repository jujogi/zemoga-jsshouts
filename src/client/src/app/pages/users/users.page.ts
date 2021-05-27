import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
})
export class UsersPage {
  users$: Observable<any>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.users$ = this.authService.getUsers();

  }
}
