import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FuncsService } from './../../services/funcs/funcs.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './../../app.state';
import { User } from './../../models/user.model';
import { Store } from '@ngrx/store';
import { UserService } from '../../services/user/user.service';
import { environment } from './../../../environments/environment';
import { throttleTime } from 'rxjs/operators';
// import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy{
  addUserMode:boolean=false;
  addUserForm: FormGroup;
  // funcs: FuncsService;
  users: Observable<User[]>

  constructor(
    public userService : UserService,
    private http: HttpClient,
    private funcs: FuncsService,
    private store: Store<AppState>,
    @Inject('REVIEWTYPE') public reTypes: any[],
    ) {
      this.users = store.select('user')
    }

  private _getPosts = `${environment.apiUrl}getallposts.php`;
  private _getUsers = `${environment.apiUrl}getusers.php`;
  private _chkVisitors = `${environment.apiUrl}sitevisitor.php`;
  private subscriptions: Subscription[] = [];
  _users:any = [];
  _posts:any = [];
  currentUserId = 0;
  currentPage: number = 0;
  maxArticle: number = 18;
  
  
  public getJSON(_url): Observable<any> {
    return this.http.get(_url);
  }
  ngOnInit(): void {
    this.initUserData();
    this.getInitPosts();
    this.checkUserColor();
    this.checkSiteVisitors();
  }
  initUserData(){
    this.subscriptions.push(
      this.userService.userData.subscribe(data=>{
        this.currentUserId = data.user;
      })
    );
  }
  getInitPosts(){
    this._getPosts += "?numb="+this.maxArticle+"&page="+this.currentPage;
    this.subscriptions.push( 
      this.getJSON(this._getPosts).subscribe(data => {
        this._posts = data;
        for(let i = 0 ;i< this._posts.length; i++){
          
          if(this._posts[i].post_images){
            this._posts[i].post_images = JSON.parse(this.funcs.removeBlank(this._posts[i].post_images));
          }
          for (var key of Object.keys(this._posts[i].post_images)) {
            // console.log("-----------",this._posts[i].post_images[key].photo);
            if(this._posts[i].post_images[key].photo){
              if (this._posts[i].post_images[key].photo.substring(0, 7) !== 'http://' && this._posts[i].post_images[key].photo.substring(0, 8) !== 'https://' ){
                // console.log("NO HTTP:",this._posts[i].post_images[key].photo);
                this._posts[i].post_images[key].photo = `${environment.imgUrl}`+this._posts[i].post_catagory+`/`+this._posts[i].post_images[key].photo;
              }
            }
          }
          this._posts[i].post_body = this.funcs.stripHTML(this.funcs.removeImg(this._posts[i].post_body));
          // console.log(this._posts[i]);
        }
        console.log(this._posts);
      })
    );
  }
  checkUserColor(){
    this.subscriptions.push( 
      this.getJSON(this._getUsers).subscribe(data => {
        this._users = data;
        for(let i = 0 ;i< this._users.length; i++){
          this._users[i].extra=[];
          this._users[i].extra.push(Math.random().toString(36).slice(-8));// get random number
          if(this._users[i].state!=="activated"){
            this.updateUserColor(i,"cccccc","cccccc","cccccc",false);
          }else{
            this.updateUserColor(i,
              this.funcs.lightenDarkenColor(this._users[i].color, 90),
              this.funcs.getContrastYIQ(this._users[i].color),
              this.funcs.lightenDarkenColor(this._users[i].color, -70)
            );
          }
        }
        this._users = this.funcs.shuffleJSON(this._users);
        console.log(this._users);
      })
    );
  }
  updateUserColor(_id,_c1,_c2,_c3,_valid:boolean=true){
    if(!_valid){
      this._users[_id].color = "999999";
    }
    this._users[_id].extra.push(_c1);
    this._users[_id].extra.push(_c2);
    this._users[_id].extra.push(_c3);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  gotoPage(user){
    console.log(user);
  }

  addUserToggle(){
    this.addUserMode = !this.addUserMode;
  }
  checkSiteVisitors(){
    let _c = JSON.parse(localStorage.getItem("reviewCheckin"));
    if(_c===null || _c.user!==this.currentUserId){
      this.subscriptions.push( 
        this.getJSON(this._chkVisitors+"?user="+this.currentUserId).pipe(throttleTime(2000)).subscribe(checkinData => {
          localStorage.setItem('reviewCheckin', JSON.stringify(checkinData));
          console.log("VISI:",checkinData);
        })
      )
    }
  }

}
