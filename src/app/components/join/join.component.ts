import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './../../app.state';
import { Store } from '@ngrx/store';
import { environment } from './../../../environments/environment';
import * as UserActions from './../../actions/user.actions';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit, OnDestroy{
  addUserForm: FormGroup;
  process:number = 1;
  private _addUserAPI = `${environment.apiUrl}addmember.php`;
  private subscriptions: Subscription[] = [];
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    @Inject('REVIEWTYPE') public reTypes: any[]
    ) { 
  }
  status = this.reTypes['stat_type'];
  animals = this.reTypes['anim_type'];
  colors = this.reTypes['colr_type'];
  selectedAnimal="";
  selectedColor:number = 0;

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      nickname: new FormControl(),
      middlename: new FormControl(),
      email: new FormControl(),
      title: new FormControl(),
      avatar: new FormControl(),
      dob: new FormControl(),
      image: new FormControl(),
      color: new FormControl(),
      description: new FormControl()
    })
    this.selectedAnimal = this.animals[Math.floor(Math.random() * this.animals.length)];
    this.selectedColor = Math.floor(Math.random() * this.colors.length);
  }
  addUser(firstname, lastname, email, middlename, nickname, title, dob, avatar, color, image, description){
    this.store.dispatch(
      new UserActions.UserRegister({
        firstname:firstname,
        lastname:lastname,
        email:email,
        middlename:middlename,
        nickname:nickname,
        title:title,
        dob:dob,
        avatar:avatar,
        color:color,
        image:image,
        description:description
      })
    )
  }
  addUserX(data){
    console.log(data);
    this.store.dispatch(
      new UserActions.UserRegister({
          'access':data.value.avatar,
          'nick':data.value.nickname,
          'userId':data.value.color,
          'image':data.value.image,
          'token':data.value.dob
      })
    )
    // this.store.dispatch(
    //   new UserActions.UserRegister({
    //     firstname:firstname,
    //     lastname:lastname,
    //     email:email,
    //     middlename:middlename,
    //     nickname:nickname,
    //     title:title,
    //     dob:dob,
    //     avatar:avatar,
    //     color:color,
    //     image:image,
    //     description:description
    //   })
    // )
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  
  public postUser(_url,_d): Observable<any> {
    return this.http.post(_url,_d);
  }

  onSubmit(){
    this.process = 2;
    let data = this.addUserForm.value;
    // data['avatar'] = [{"color":data.color},{"chr":data.avatar}];
    data['state'] = "hold";
    data['color'] = this.colors[data['color']].code;
    console.log(data)
    if(data.firstname!=null && data.lastname!=null && data.email!=null && data.nickname!=null && data.title!=null && data.description!=null){
      this.subscriptions.push(
        this.postUser(this._addUserAPI,data).subscribe(dataFB => {
          this.process = 3;
        })
      );
    }
  }
  errBack(){
    this.process = 1;
  }
}