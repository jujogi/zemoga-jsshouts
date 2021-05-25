import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { FacebookService } from '../../services/facebook.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
})
export class CreatePostPage {

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
  }
}
