import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { FuncsService } from './../../services/funcs/funcs.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { GlobalvarService } from '../../services/globalvar/globalvar.service';
import { environment } from './../../../environments/environment';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  constructor(
    public userService : UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private funcs: FuncsService,
    private fb: FormBuilder,
    private globalVar: GlobalvarService,
    private pageTitle: Title,
    private pageMeta: Meta,
    @Inject('REVIEWTYPE') public reTypes: any[]
    ) {
  }
  addPostForm: FormGroup;
  addPostMode:boolean=false;
  posts = [];
  photos = [];
  merged = [];
  currentPage: number = 0;
  maxArticle: number = 12;
  totalPostNumber: number = 0;
  totalPages=[];
  postOwner = null;
  postOwnerName = "";
  currentUserData:any;
  selectedCatagory = "general";
  selectedLayout = "INLINE";
  charCount=0;
  tags = [];
  files: File[] = [];
  rte_modules={};
  initImageBox = [{"imgUrl":null,"imgDesp":null,'err':true},{"imgUrl":null,"imgDesp":null,'err':true},{"imgUrl":null,"imgDesp":null,'err':true}];
  private _getReviewAPI = `${environment.apiUrl}getposts.php`;
  private _postAPI = `${environment.apiUrl}articlesubmit.php`;
  private subscriptions: Subscription[] = [];
  catas = this.reTypes['post_type'];
  layouts = this.reTypes['post_layout'];

  public getJSON(_url): Observable<any> {
    return this.http.get(_url);
  }
  public postArticle(_url,_d): Observable<any> {
    return this.http.post(_url,_d);
  }
  // public selectedDelPosts(): Observable<any> {
  //   return this.posts;
  // }
  ngOnInit(): void {
    this.rte_modules = this.globalVar.rte_modules;
    this.addPostForm = this.fb.group({
      catagory: new FormControl(),
      title: new FormControl(),
      layout: new FormControl(),
      imageUrl0: new FormControl(),
      imageUrl1: new FormControl(),
      imageUrl2: new FormControl(),
      imageDesp0: new FormControl(),
      imageDesp1: new FormControl(),
      imageDesp2: new FormControl(),
      video: new FormControl(),
      review: new FormControl(),
    })
    this.getPosts();
    this.subscriptions.push(
      // this.userService.userData.pipe(filter(data => data.token!="")).subscribe(data=>{
      this.userService.userData.subscribe(data=>{
        this.currentUserData = data;
        console.log("BLOG.currentUserData >>>",this.currentUserData);
        this.pageTitle.setTitle('Javy\'s Review');
        this.pageMeta.updateTag({ property: 'og:image', content: 'https://javy.hardmouse.com/assets/images/users/upload/'+this.currentUserData.user+'/'+this.currentUserData.image });
        this.pageMeta.updateTag({ name: 'description', content: 'Javy\'s Review - Reviewer:'+this.currentUserData.nick });
      })
    );
    this.initTags();
    // window.onscroll = function(ev) {
    //   // console.log("scrolling...",this.innerHeight + this.pageYOffset," >= ",ev.target.getElementsByTagName("main")[0].offsetHeight);
    //   if (this.innerHeight + this.pageYOffset >= ev.target.getElementsByTagName("main")[0].offsetHeight) {
    //     // this.loadMoreArticle();
    //     console.log("End");
    //   }
    // };
  }
  initTags() {
    for(let i of Object.keys(this.catas)){
      this.tags[i]=JSON.parse("{\"name\":\""+this.catas[i]+"\",\"val\":true}");
    }
  }
  charCountFunc(e){
    this.charCount = e.length -7;
    console.log(this.charCount);
  }
  getPosts() {
    this.totalPages = [];
    this.subscriptions.push(
      this.route.params.subscribe(paramsVal =>{
        let _sid = JSON.parse(localStorage.getItem("review-user"));
        if(paramsVal.id){
          this._getReviewAPI += "?user="+paramsVal.id+"&sid="+_sid.token+"&numb="+this.maxArticle+"&page="+this.currentPage;
          this.postOwner = paramsVal.id;
          this.subscriptions.push( 
            this.getJSON(this._getReviewAPI).subscribe(data => {
              this.posts = data;
              for(let i = 0 ;i< this.posts.length; i++){
                if(this.posts[i].post_images){
                  this.posts[i].post_images = JSON.parse(this.funcs.removeBlank(this.posts[i].post_images));
                }
                for (var key of Object.keys(this.posts[i].post_images)) {
                  if(this.posts[i].post_images[key].photo){
                    if (this.posts[i].post_images[key].photo.substring(0, 7) !== 'http://' && this.posts[i].post_images[key].photo.substring(0, 8) !== 'https://' ){
                      this.posts[i].post_images[key].photo = `${environment.imgUrl}`+this.posts[i].post_catagory+`/`+this.posts[i].post_images[key].photo;
                    }
                  }
                }
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",this.posts[i].nickname);
                this.postOwnerName = this.posts[i].nickname;
                // console.log(">>>>>>>>>this.postOwnerName>>>>>>>>>>>>>>>",this.postOwnerName);
                this.posts[i].post_body = this.funcs.stripHTML(this.posts[i].post_body);
                this.posts[i].delete=false;
                this.totalPostNumber = this.posts[i].totalPost;
              }
              for(let i=0;i< Math.ceil(this.totalPostNumber/this.maxArticle);i++){
                this.totalPages.push(i);
              }
              // console.log("hh:",this.posts,":",this.totalPages);
            })
          );
        }
      })
    )
  }
  addPosts() {
    let _sid = JSON.parse(localStorage.getItem("review-user"));
    this._getReviewAPI += "?user="+this.postOwner+"&sid="+_sid.token+"&numb="+this.maxArticle+"&page="+this.currentPage;
    let _post = this.subscriptions.push( 
      this.getJSON(this._getReviewAPI).subscribe(data => {
        for(let i = 0 ;i< data.length; i++){
          if(data[i].post_images){
            data[i].post_images = JSON.parse(this.funcs.removeBlank(data[i].post_images));
          }
          for (var key of Object.keys(data[i].post_images)) {
            if(data[i].post_images[key].photo){
              if (data[i].post_images[key].photo.substring(0, 7) === 'http://' || data[i].post_images[key].photo.substring(0, 8) === 'https://' ){
                
              }else{
                data[i].post_images[key].photo = `${environment.imgUrl}`+data[i].post_catagory+`/`+data[i].post_images[key].photo;
              }
            }
          }
          data[i].post_body = this.funcs.stripHTML(data[i].post_body);
          data[i].delete=false;
        }
        this.posts.push(...data);
        console.log("POSTS:",this.posts,"      DATA:",...data);
      })
    );
  }
  onSubmit(){
    let data = this.addPostForm.value;
    let _sid = JSON.parse(localStorage.getItem("review-user"));
    for (let i of Object.keys(this.initImageBox)){
      if(this.initImageBox[i].err == true){
        data['imageUrl'+i] = null;
        data['imageDesp'+i] = null;
      }
    }
    // console.log(data);
    // console.log(this.initImageBox);
    if(data.review && data.title){
      data.review = this.funcs.escapeSpecialCaseChar(data.review);
      // console.log('has data');
    }else{
      // console.log('something invalid');
    }
    // filter
    this.subscriptions.push(
      this.postArticle(this._postAPI+"?user="+_sid.user,data).subscribe(dataFB => {
        // console.log("dataFB",dataFB);
        this.refreshPage();
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addPostToggle(){
    this.addPostMode = !this.addPostMode;
  }
  
  layoutChange(e){
    console.log(e);
    this.selectedLayout = e;
  }
  
  onSelect(event) {
    console.log("E:",event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) { 
      formData.append("file[]", this.files[i]);
    }
    this.subscriptions.push(
      this.http.post(`${environment.apiUrl}imagesender.php`, formData)
      .subscribe(res => {
        console.log("RES:",res);
        alert('Uploaded Successfully.');
      })
    );
  }

  refreshPage() {
    // let _url = "/article/"+this.currentArticleID;
    // this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this._router.onSameUrlNavigation = 'reload';
    // this._router.navigate([_url]);
    window.location.reload();
  }
  onRemove(event) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
  }
  imgUrlUpdate(e,_id){
    setTimeout(() => {
      if(this.funcs.isUrlValid(e)){
        this.initImageBox[_id].imgUrl = e;
        this.initImageBox[_id].err = false;
      }
    }, 0)
  }
  errorImageUrl(evt,_id) {
    this.initImageBox[_id].err = true;
  }
  loadMoreArticle(){
    if(this.totalPages.length-1 > this.currentPage){
      this.currentPage++;
      this.addPosts();
    }
  }
  selectDelete(_id){
    this.posts[_id].delete = !this.posts[_id].delete;
    // this.subscriptions.push( 
    //   this.getJSON(this._getReviewAPI).subscribe(data => {
  }
  deletePosts(){
    for(let i of Object.keys(this.posts)){
      if(this.posts[i].delete){
        console.log("delete =>", i,":",this.posts[i].post_uid);
      }
    }
    this.posts = this.posts.filter(el => !el.delete);
  }
  tagClick(_i){
    console.log(this.tags[_i].val, _i)
    this.tags[_i].val = !this.tags[_i].val;
  }
}
