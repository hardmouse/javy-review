import { Component, OnInit, Inject, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() fullView:boolean = true;
  animals = this.reTypes['anim_type'];
  colors = this.reTypes['colr_type'];
  modUserForm: FormGroup;
  curentUser: any;
  selectedAnimal=0;
  selectedAniVal="";
  selectedColor:number = 0;
  private _profileAPI = `${environment.apiUrl}getprofile.php`;
  private subscriptions: Subscription[] = [];
  constructor(
    private userService : UserService,
    private http: HttpClient,
    fb: FormBuilder,
    private cd: ChangeDetectorRef,
    @Inject('REVIEWTYPE') public reTypes: any[]
    ) { 
      this.modUserForm = fb.group({
        "firstname": "",
        "lastname": "",
        "email":"",
        "nickname":"",
        "middlename":"",
        "title":"",
        "dob":"",
        "avatar":"",
        "color":"",
        "description":"",
        "myimage":""
      })
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.userData.pipe(take(1)).subscribe(data=>{
        this.curentUser = data;
        console.log("this.curentUser>>",this.curentUser);
      })
    )
    
    // this.modUserForm = new FormGroup({
    //   firstname: new FormControl(),
    //   lastname: new FormControl(),
    //   nickname: new FormControl(),
    //   middlename: new FormControl(),
    //   email: new FormControl(),
    //   title: new FormControl(),
    //   avatar: new FormControl(),
    //   dob: new FormControl(),
    //   myimage: new FormControl(),
    //   color: new FormControl(),
    //   description: new FormControl()
    // })
    // this.selectedAnimal = this.animals[Math.floor(Math.random() * this.animals.length)];
    // this.selectedColor = Math.floor(Math.random() * this.colors.length);
    this.getProfileData();
  }
  // this._articleAPI += "?user="+curentUser.user+"&sid="+curentUser.token;
  getProfileData(){
    this.subscriptions.push( 
      this.getJSON(this._profileAPI+ "?user="+this.curentUser.user+"&sid="+this.curentUser.token).pipe(take(1)).subscribe(data => {
        console.log(data);
        console.log(this.modUserForm);
        this.modUserForm.patchValue(data[0]);
        this.refreshInfo();

        
      })
    );
  }
  refreshInfo(){
    console.log(this.colors);
    let _undefinedColorCode = true;
    for(let i=0; i<this.colors.length; i++){
      if(this.colors[i].code == this.modUserForm.value.color){
        this.selectedColor = i;
        _undefinedColorCode = false;
      }
    }
    if(_undefinedColorCode){
      this.selectedColor = 0;
    }
    for(let i=0; i<this.animals.length; i++){
      if(this.animals[i] == this.modUserForm.value.avatar){
        this.selectedAnimal = this.modUserForm.value.avatar;
      }
    }
  }

// DO NOT DELETE FOR STUDY

  // public onTouched: () => void = () => { };
  // writeValue(obj: any): void {
  //   console.log("ChildWorkOrderServiceProviderDetailComponent writeValue", obj);
  //   obj && this.modUserForm.setValue(obj, { emitEvent: false });
  // }
  // registerOnChange(fn: any): void {
  //   this.subscriptions.push(this.modUserForm.valueChanges.subscribe(fn));
  // }
  // registerOnTouched(fn: any): void {
  //   this.onTouched = fn;
  // }
  // setDisabledState?(isDisabled: boolean): void {
  //   console.log("ChildWorkOrderServiceProviderDetailComponent setDisabledState", isDisabled);
  //   isDisabled ? this.modUserForm.disable() : this.modUserForm.enable();
  // }

  // validate(c: AbstractControl): ValidationErrors | null {
  //   console.log("ChildWorkOrderServiceProviderDetailComponent validate", c, this.modUserForm.valid);
  //   return this.modUserForm.valid ? null : { invalidForm: { valid: false, message: "Service Provider is invalid" } };
  // }

  public getJSON(_url): Observable<any> {
    return this.http.get(_url);
  }
  setAvatar(e){
    this.selectedAnimal = e.target.value;
  }
  setColor(e){
    this.selectedColor = e.target.value;
  }
}
