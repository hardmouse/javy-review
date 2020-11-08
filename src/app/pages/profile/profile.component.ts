import { Component, OnInit, Inject, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { ImgUploadService } from '../../services/imgupload/img-upload.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() fullView:boolean = true;
  animals = this.reTypes['anim_type'];
  colors = this.reTypes['colr_type'];
  modUserForm: FormGroup;
  curentUser: any;
  curentUserDetail: any = {"points":0,"reward":0};
  selectedAnimal=0;
  selectedAniVal="";
  selectedColor:number = 0;

  imageUrl = null;
  photo: Blob;

  private _profileAPI = `${environment.apiUrl}getprofile.php`;
  private _profileUpdateAPI = `${environment.apiUrl}updateprofile.php`;
  private subscriptions: Subscription[] = [];
  constructor(
    private userService : UserService,
    private http: HttpClient,
    fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private _router: Router,
    private _imgUpload: ImgUploadService,
    public _DomSanitizationService: DomSanitizer,
    @Inject('REVIEWTYPE') public reTypes: any[]
    ) { 
      this.modUserForm = fb.group({
        "firstname": "",
        "lastname": "",
        "pass1":"",
        "pass2":"",
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
    this.getProfileData();
    if(!this.curentUser || this.curentUser.user<=0){
      this._router.navigate(['/join']);
    }
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  // this._articleAPI += "?user="+curentUser.user+"&sid="+curentUser.token;
  getProfileData(){
    this.imageUrl = `${environment.uimUrl}`+this.curentUser.user+`/`+this.curentUser.image;
    this.subscriptions.push( 
      this.getJSON(this._profileAPI+ "?user="+this.curentUser.user+"&sid="+this.curentUser.token).pipe(take(1)).subscribe(data => {
        this.curentUserDetail = data[0];
        console.log(this.curentUserDetail);
        this.modUserForm.patchValue(data[0]);
        this.refreshInfo();
      })
    );
  }
  refreshInfo(){
    let _undefinedColorCode = true;
    for(let i=0; i<this.colors.length; i++){
      if(this.colors[i].code == this.modUserForm.value.color){
        this.selectedColor = this.colors[i].code;
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
  public updateProfile(_url,_d): Observable<any> {
    return this.http.post(_url,_d);
  }
  setAvatar(e){
    this.selectedAnimal = e.target.value;
  }
  setColor(e){
    this.selectedColor = e.target.value;
    // console.log(this.modUserForm);
  }
  
  onSubmit(){
    let data = this.modUserForm.value;
    console.log(data);
    if(data.firstname!=null && data.lastname!=null && data.email!=null && data.nickname!=null && data.title!=null && data.description!=null){
      this.subscriptions.push(
        this.updateProfile(this._profileUpdateAPI+ "?user="+this.curentUser.user+"&sid="+this.curentUser.token,data).subscribe(dataFB => {
          
          this._router.navigate(['/blog/'+this.curentUser.user]);
        })
      );
      this.subscriptions.push(
        this.userService.userData.pipe(take(1)).subscribe(dataFB => {
          localStorage.setItem("review-user", JSON.stringify(dataFB));
          this.userService.setUser(dataFB);
          console.log(dataFB,"===========");
        })
      );
    }
  }


  setPhoto(event){
    this.photo = event.target.files[0];
    console.log("this.photo:",this.photo);
    this.uploadUserImage();
  }
  uploadUserImage(){
    const fd = new FormData();
    fd.append('userImage',this.photo);
    fd.append('user',this.curentUser.user);
    this.subscriptions.push(
      this._imgUpload.postImage(fd).subscribe(res => {
        let _result = JSON.parse(res);
        this.modUserForm.value.myimage = this.curentUser.image = _result['file'];
        this.imageUrl = `${environment.uimUrl}`+this.curentUser.user+`/`+this.curentUser.image;
      })
    );
  }
}
