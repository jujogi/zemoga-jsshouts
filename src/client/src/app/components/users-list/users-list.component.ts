import { Component, Input } from '@angular/core';

import { IUser } from '../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {
  @Input() users: IUser[];
}
