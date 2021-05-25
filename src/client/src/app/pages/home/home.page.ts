import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FacebookService } from 'src/app/services/facebook.service';

import { IUser } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
})
export class HomePage {
  user: IUser;
  users$: Observable<any>;

  constructor(
    private authService: AuthService,
    private facebookService: FacebookService
  ) { }

  ngOnInit() {
    this.users$ = this.authService.getUsers();

    this.facebookService.getProfile()
      .subscribe(profile => console.log(profile));
  }
}
