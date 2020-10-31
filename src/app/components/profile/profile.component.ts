import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() curentUser: any={'user':'u','nick':'ni','color':'ffffff'};
  constructor() { }

  ngOnInit(): void {
  }

}
