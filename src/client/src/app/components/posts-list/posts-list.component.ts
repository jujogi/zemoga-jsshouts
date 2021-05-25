import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent {
  @Input() posts: any[];
}
