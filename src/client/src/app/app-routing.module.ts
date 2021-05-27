import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './pages/home/home.page';
import { PhotosPage } from './pages/photos/photos.page';
import { PostsPage } from './pages/posts/posts.page';
import { SigninPage } from './pages/signin/signin.page';
import { SignupPage } from './pages/signup/signup.page';
import { UsersPage } from './pages/users/users.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'signup',
    component: SignupPage,
  },
  {
    path: 'signin',
    component: SigninPage,
  },
  {
    path: 'posts',
    component: PostsPage,
  },
  {
    path: 'photos',
    component: PhotosPage,
  },
  {
    path: 'users',
    component: UsersPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
