import { Injectable,OnInit,Output } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class TitleService implements OnInit{
  @Output() userNick = "MY";
  constructor() { }
  
  ngOnInit(): void {
    let _t = this.getNick();
  }
  getNick(){
    let _c = JSON.parse(localStorage.getItem("review-user"));
    if(_c.access==="allow"){
      this.userNick = _c.nick;
    }
    return this.userNick;
  }
}
