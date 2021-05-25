import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { FacebookService } from '../../services/facebook.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
})
export class PostsPage {
  posts$: Observable<any>;

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.posts$ = this.facebookService.getPosts();
  }
}
