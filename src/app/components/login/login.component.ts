import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { environment } from './../../../environments/environment';
// import { select, Store } from '@ngrx/store';
// import * as allActions from './../../actions/user.actions';
// import { User } from './../../models/user.model';
// import { TitleService } from './../../services/title/title.service'

// interface UserDefault{
//   nickName: string;
//   state: string;
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit{

  loggedUser:string = "";
  userLoginForm: FormGroup;
  private _userLoginAPI = `${environment.apiUrl}userlogin.php`;
  private subscriptions: Subscription[] = [];
  // titleHandler:TitleService = new TitleService;
  // user: Observable<User[]>;
  userNick$ :Observable<string>;
  constructor(
    private http: HttpClient,
    private userService : UserService
    // private store: Store<{userX: User[]}>
    ) {
      // store.pipe(select('userX')).subscribe(values => {
      //   // this.userX = values;
        
      //   console.log(this.user,"V:",values);
      // })
    }

  ngOnInit(): void {
    // Form prepration
    this.userLoginForm = new FormGroup({
      loginId: new FormControl(),
      passwd: new FormControl()
    })
    // Get user info from localStorage
    let _c = JSON.parse(localStorage.getItem("review-user"));
    if(_c.access==="allow"){
      this.loggedUser = _c.nick;
      this.setGlobalValue(_c);
    }
    this.subscriptions.push(
      this.userService.userData.subscribe(data=>{
        // console.log(" this.userService.userData.subscribe>>",data);
      })
    )
  }
  ngAfterViewInit():void{
  }
  ngOnDestroy() {
    console.log("DESTROY");
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public userLogin(_url,_d): Observable<any> {
    return this.http.post(_url,_d);
  }

  setGlobalValue(_data:any) {
    // All components that are subscribed to the
    // messenger service receive the update
    // console.log("this.userService.userData:BEFORE::::",this.userService.getUser());
    // console.log("GLOBAL:",_data);
    this.userService.setUser(_data);
    // console.log("this.userService.userData:::::",this.userService.userData);
    // console.log("this.userService.userData:AFTER::::",this.userService.getUser());
  }

  onSubmit(){
    let data = this.userLoginForm.value;
    this.userLoginForm.reset();
    // console.log(this.userLoginForm);
    // data['state'] = "hold";
    // console.log(data);
    this.subscriptions.push(
      this.userLogin(this._userLoginAPI,data).subscribe(dataFB => {
        if(dataFB.length){
          // console.log("After login success => dataFB[0]: "+ dataFB);
          this.loggedUser = dataFB[0].nick;
          let _data = JSON.stringify({"access":"allow", "user":dataFB[0].id, "nick":dataFB[0].nick, "image":dataFB[0].image, "token":dataFB[0].token, "color":dataFB[0].color});
          localStorage.setItem("review-user", _data);
          this.setGlobalValue(JSON.parse(_data));
        }else{
          this.loggedUser="";
          localStorage.setItem("review-user", JSON.stringify({"access":"block"}));
          console.log("no match");
        }
      })
    );
  }
  logout(){
    this.loggedUser = "";
    this.userService.resetUser();
    localStorage.setItem("review-user", JSON.stringify({}));
  }
}
