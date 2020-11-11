import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { TitleService } from './../../services/title/title.service';

import { User } from './../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() userImage: string;
  
  users: Observable<User[]>
  currentUserId:number = 0;
  currentUserData:any;
  errorImage:boolean = false;
  prop = {};
  // subTitle: any;
  // userInfo =  this.userService.userData.source._value;
  // headImage="./../../assets/images/users/"+this.userService.userData.source.value.image;
  titleHandler:TitleService = new TitleService;
  profileOver: boolean = false;
  userLoggedIn: boolean = false;
  private subscriptions: Subscription[] = [];
  constructor(
    public userService : UserService,
    private store: Store<AppState>
  ) {
    this.users = store.select('user')
  }

  ngOnInit(): void {
    // prevent Error:ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // setTimeout(() => {
      this.recheckUser();
    // }, 0)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  checkVal(){
    console.log(this.userService.userData);
  }

  recheckUser(){
    this.subscriptions.push(
      // this.userService.userData.pipe(filter(data => data.token!="")).subscribe(data=>{
      this.userService.userData.pipe(delay(0)).subscribe(data=>{
        this.currentUserData = data;
        this.currentUserId = data.user;
        this.title = data.nick;
        this.userImage = data.image;
        console.log("this.currentUserData >>>>>>>>>",this.currentUserData);
      })
    );
  }
  errorImageCheck(e){
    console.log(e);
    this.errorImage = true;
  }
}
