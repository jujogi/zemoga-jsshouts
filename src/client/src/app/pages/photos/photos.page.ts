import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { FacebookService } from '../../services/facebook.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
})
export class PhotosPage {
  photos$: Observable<any>;

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.photos$ = this.facebookService.getPhotos();
  }
}
