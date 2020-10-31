import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user/user.service'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  customInputForm: FormGroup;
  private userSubscription: Subscription;
  aboutNum = [" "," "];
  constructor(
              private userService : UserService,
              private formBuilder: FormBuilder
  ) { }
  // userdata = this.userService.userData2;
  ngOnInit(): void {
    this.userSubscription = this.userService.userData.subscribe(d =>{
    });
    console.log("Data-About:",this.userService.getUser());
    this.customInputForm = this.formBuilder.group(
      {
        email: [''],
        fullname: ['Bill Gates'],
        phone: [{
          value: '0497 88 88 88',
          disabled: true
        }]
      },
      // Uncomment to test `registerOnTouched`
      // { validator: { updateOn: 'blur' } }
    );
  }

}
