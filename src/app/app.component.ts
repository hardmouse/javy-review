import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { FuncsService } from './services/funcs/funcs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'My Review';
  funcs: FuncsService;
  themeColor = "";
  darkColor = "";
  constructor(
    public userService : UserService
  ) {}
  ngOnInit(){
    if(JSON.parse(localStorage.getItem("review-user"))===null){
      // console.log("=+++++++++++++++++++++++++++++++++++++");
      localStorage.setItem("review-user", JSON.stringify({"access":"block"}));
    }
  }
  ngAfterViewInit():void{
    this.themeColor = this.userService.getUser().color;
    // this.darkColor = this.funcs.lightenDarkenColor(this.themeColor, -100);
  }
  
}
