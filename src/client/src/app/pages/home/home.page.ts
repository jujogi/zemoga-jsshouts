import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }
}
