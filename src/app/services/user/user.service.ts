import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // userModel:UserModel = new UserModel;
  preUserModel:User = {
    'access':'PRIVATE',
    'user':0,
    'nick':'My',
    'image':'reviews.png',
    'token':'',
    'color':'5217C9'
  }
  http: HttpClient;

  constructor(http: HttpClient) { }

  private userSource: BehaviorSubject<any> = new BehaviorSubject(this.preUserModel);

  public userData = this.userSource.asObservable();

  getAll() {
    return this.http.get(`${environment.apiUrl}/users`);//this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  register(user: User) {
      return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
  public setUser(data:any){
    this.userSource.next(data);
    console.log("this.userSource.value:",this.userSource.value);
    // console.log("data:",data);
    // console.log("this.userData:",this.userData);
  }
  getUser(){
    return this.userSource.value;
    // return this.userSource.getValue();
  }
  public resetUser(){
    this.setUser(this.preUserModel);
  }








  


}
