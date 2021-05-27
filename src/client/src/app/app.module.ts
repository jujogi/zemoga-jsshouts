import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AuthService } from './services/auth.service';
import { SignupPage } from './pages/signup/signup.page';
import { HomePage } from './pages/home/home.page';
import { SigninPage } from './pages/signin/signin.page';
import { UsersListComponent } from './components/users-list/users-list.component';
import { PostsPage } from './pages/posts/posts.page';
import { FacebookService } from './services/facebook.service';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotosPage } from './pages/photos/photos.page';
import { UsersPage } from './pages/users/users.page';

@NgModule({
  declarations: [
    AppComponent,
    SignupPage,
    HomePage,
    SigninPage,
    UsersListComponent,
    PostsPage,
    PostsListComponent,
    PhotosPage,
    PhotosListComponent,
    UsersPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AuthService, FacebookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
