import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
})
export class PhotosListComponent {
  @Input() photos: any[];
}
