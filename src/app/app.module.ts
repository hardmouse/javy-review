import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { userReducer } from './reducer/user.reducer'
import { postReducer } from './reducer/post.reducer'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FoodComponent } from './pages/food/food.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LandingComponent } from './pages/landing/landing.component';
import { StoryComponent } from './pages/story/story.component';
import { JoinComponent } from './pages/join/join.component';
import { ArticleComponent } from './pages/article/article.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostReviewComponent } from './components/post-review/post-review.component';

import { VideoGameComponent } from './shared/components/video-game/video-game.component';
import { AnimalPickerComponent } from './shared/components/animal-picker/animal-picker.component';

// Lists of option elements
import * as reTypes from './shared/alltype';
import { SafePipe } from './safe.pipe';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill'
import { AlertComponent } from './components/alert/alert.component';
// const modules = {
//   toolbar: [
//     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//     ['blockquote', 'code-block'],
 
//     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//     [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//     [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//     [{ 'direction': 'rtl' }],                         // text direction
 
//     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
 
//     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//     [{ 'font': [] }],
//     [{ 'align': [] }],
 
//     ['clean'],                                         // remove formatting button
 
//     ['link', 'image', 'video']                         // link and image, video
//   ]
// };
@NgModule({
  declarations: [
    AppComponent,
    VideoGameComponent,
    FoodComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    PostReviewComponent,
    LandingComponent,
    StoryComponent,
    ArticleComponent,
    SafePipe,
    LoginComponent,
    JoinComponent,
    AlertComponent,
    AnimalPickerComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    QuillModule.forRoot(),
     // 'user' will be retrived from where the page's 'store' select/request in constructor(){...}.
     // And all action in 'reducer(userReducer)' can be applied. It also include the initial state defined in 'reducer'.
    StoreModule.forRoot({ user: userReducer, post: postReducer})
  ],
  providers: [
    {provide:'REVIEWTYPE', useValue: reTypes }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
