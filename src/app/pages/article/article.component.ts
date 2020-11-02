import { Component, OnInit, AfterViewInit, OnDestroy, Inject} from '@angular/core';
// import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { GlobalvarService } from '../../services/globalvar/globalvar.service';
import { FuncsService } from './../../services/funcs/funcs.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {

  updatePostForm: FormGroup;
  replyForm: FormGroup;
  constructor(
    public userService : UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private globalVar: GlobalvarService,
    private funcs: FuncsService,
    private _router: Router,
    @Inject('REVIEWTYPE') public reTypes: any[]
  ) { }

  article = [];
  feedback = [];
  tempImageBox = [{"photo":null,"name":null,'err':true},{"photo":null,"name":null,'err':true},{"photo":null,"name":null,'err':true}];
  // tempImageBox = [{},{},{}];
  currentArticleID = null;
  currentArticleUserID = null;
  totalFeed = [];
  totalReply = [];
  editmode:boolean=false;
  editdate = null;
  selectedCatagory = null;
  selectedLayout = null;
  currentUserData:any;
  rte_modules:any;
  reply_rte_modules:any;
  currentVideo:string = "";
  currentBody:string = "";
  private _articleAPI = `${environment.apiUrl}getarticle.php`;
  private _updateAPI = `${environment.apiUrl}articleupdate.php`;
  private _replyAPI = `${environment.apiUrl}replysubmit.php`;
  private _replyGetAPI = `${environment.apiUrl}getreply.php`;
  private _feedAPI = `${environment.apiUrl}getfeed.php`;
  private _feedPostAPI = `${environment.apiUrl}addfeed.php`;
  private _deleteArticleAPI = `${environment.apiUrl}deletearticle.php`;
  private subscriptions: Subscription[] = [];

  catas = this.reTypes['post_type'];
  layouts = this.reTypes['post_layout'];
  ngOnInit(): void {
    this.updatePostForm = new FormGroup({
      catagory: new FormControl(),
      title: new FormControl(),
      layout: new FormControl(),
      imageUrl0: new FormControl(),
      imageUrl1: new FormControl(),
      imageUrl2: new FormControl(),
      imageName0: new FormControl(),
      imageName1: new FormControl(),
      imageName2: new FormControl(),
      video: new FormControl(),
      review: new FormControl()
    });
    this.replyForm = new FormGroup({
      userReply: new FormControl()
    });

    this.rte_modules = this.globalVar.rte_modules;
    this.reply_rte_modules = this.globalVar.reply_rte_modules;
    this.subscriptions.push(
      this.route.params.subscribe(paramsVal =>{
        let _sid = JSON.parse(localStorage.getItem("review-user"));
        if(paramsVal.id){
          this.currentArticleID = paramsVal.id;
          this._articleAPI += "?article="+paramsVal.id+"&sid="+_sid.token;
          this._replyGetAPI += "?article="+paramsVal.id;


          
          this.subscriptions.push( 
            this.getJSON(this._articleAPI).subscribe(data => {
              this.article = data;
              for(let i = 0 ;i< this.article.length; i++){
                this.currentArticleUserID = this.article[i].post_user_id;
                if(this.article[i].post_images){
                  this.article[i].post_images = JSON.parse(this.article[i].post_images);
                }
                for (var key of Object.keys(this.tempImageBox)) {
                  if(this.article[i].post_images[key]){
                    this.tempImageBox[key] = this.article[i].post_images[key];
                    if (this.tempImageBox[key].photo.substring(0, 7) !== 'http://' && this.tempImageBox[key].photo.substring(0, 8) !== 'https://' ){
                      this.tempImageBox[key].photo = `${environment.imgUrl}`+this.article[i].post_catagory+`/`+this.tempImageBox[key].photo;
                    }
                  }
                }
                this.currentBody = this.funcs.removeImg(this.article[i].post_body);
                if(this.article[i].post_edit_date){
                  this.editdate = this.article[i].post_edit_date;
                }
                if(this.article[i].post_catagory){
                  this.selectedCatagory = this.article[i].post_catagory;
                }
                if(this.article[i].post_layout){
                  this.selectedLayout = this.article[i].post_layout;
                }
                this.currentVideo = this.funcs.checkVideoUrl(this.article[i].post_video_url);
              }
              console.log("article:",data);
            })
          );
          
          this.subscriptions.push( 
            this.getJSON(this._replyGetAPI).subscribe(data => {
              this.totalReply = data;
              console.log(this.totalReply);
            })
          );
        }
      })
    );

    this.subscriptions.push(
      // this.userService.userData.pipe(filter(data => data.token!="")).subscribe(data=>{
      this.userService.userData.subscribe(data=>{
        this.currentUserData = data;
        // console.log("ARTICLE.currentUserData >>>>>>>>>",this.currentUserData);
      })
    );

    this._feedAPI += "?article="+this.currentArticleID;
    this.subscriptions.push( 
      this.getJSON(this._feedAPI).subscribe(data => {
        this.feedback = data;
        // for(let i = 0 ;i< this.article.length; i++){
        //   this.article[i].avatar = JSON.parse(this.article[i].avatar);
        //   this.article[i].photo_url = JSON.parse(this.article[i].photo_url);
        // }
        this.setFeed(this.feedback);
      })
    );
  }
  
  public getJSON(_url): Observable<any> {
    return this.http.get(_url);
  }
  public postMyFeed(_url,_val): Observable<any> {
    return this.http.post(_url,_val);
  }

  ngAfterViewInit() {
  }
  
  imageLayout(_layout){
    switch (_layout){
      case "FULL":
        return "col-12"
        break;
      case "MIXED":
        return "col-12 col-md-2"
        break;
      case "INLINE":
        return "col-12 col-md-4"
        break;
      default:
        return "col-12 col-md-4"
        break;
    }
  }
  imgUrlUpdate(e,_id){
    setTimeout(() => {
      // console.log(_id,":",e);
      if(this.funcs.isUrlValid(e)){
        this.tempImageBox[_id].photo = e;
        this.tempImageBox[_id].err = false;
      }else{
        this.tempImageBox[_id].photo = null;
      }
    }, 0)
  }
  errorImageUrl(evt,_id) {
    // console.log("ERR:",evt,_id);
    this.tempImageBox[_id].photo = "./../../assets/images/users/reviews.png";
    this.tempImageBox[_id].err = true;
  }
  errorImageUrl2(evt,_id) {
    // console.log("ERR 2:",evt,_id);
    this.tempImageBox[_id].err = true;
  }
  layoutChange(e){
    this.selectedLayout = e;
  }
  ngOnDestroy() {
    console.log("DESTROY");
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  refreshPage() {
    // let _url = "/article/"+this.currentArticleID;
    // this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this._router.onSameUrlNavigation = 'reload';
    // this._router.navigate([_url]);
    window.location.reload();
  }
  setFeed(_data){
    for(let i=0; i<_data.length; i++){
      // console.log("F:",_data[i]);
      if(this.totalFeed.hasOwnProperty(_data[i].feed_type)){
        this.totalFeed[_data[i].feed_type] += 1;
      }else{
        this.totalFeed[_data[i].feed_type] = 1;
      }
    }
    // console.log("total:",this.totalFeed);
  }

  like(_feed){
    this.subscriptions.push( 
      this.postMyFeed(this._feedPostAPI,[_feed, 1]).subscribe(data => {
        console.log("when post feed:",data)
      })
    );
  }
  
  // onFormSubmit(data){
  //   data.postId = this.currentArticleID;
  //   data.userId = 1;
  //   this.onSubmit(data,1,this.currentArticleID);
  // }
  onReplySubmit(){
    let data = this.replyForm.value;
    data.replyUserId = this.currentUserData.user;
    data.replyUserNick = this.currentUserData.nick;
    data.replyUserToken = this.currentUserData.token;
    data.replyArticleId = this.currentArticleID;
    if(data.userReply){
      this.subscriptions.push( 
        this.postMyFeed(this._replyAPI,data).subscribe(replyFeed => {
          console.log("replyFeed:",replyFeed);
        })
      );
    }else{
      console.log("SAY SOMETHING");
    }
  }
  onFeedClick(_v){
    let data = {};
    data['feedtype'] = _v;
    this.onSubmit(data,1,this.currentArticleID);
  }
  onSubmit(data,user,post){
    data.postId = post;
    data.userId = user;
    console.log(data);
    this.subscriptions.push( 
      this.postMyFeed(this._feedPostAPI,data).subscribe(dataFeed => {
        console.log("dataFeed:",dataFeed);
      })
    );
  }
  onUpdateSubmit(){
    let data = this.updatePostForm.value;
    let _sid = JSON.parse(localStorage.getItem("review-user"));
    let _tempAPI = this._updateAPI += "?article="+this.currentArticleID+"&sid="+_sid.token;
    
    for (var key of Object.keys(this.tempImageBox)) {
      if(this.tempImageBox[key].err){
        data['imageUrl'+key] = null;
        data['imageName'+key] = null;
      }
    }
    this.subscriptions.push( 
      this.postMyFeed(_tempAPI,data).subscribe(updateFeed => {
        this.refreshPage();
      })
    );
  }
  toggleEdit(){
    this.editmode=!this.editmode;
  }
  deleteArticle(){
    let _sid = JSON.parse(localStorage.getItem("review-user"));
    let _tempAPI = this._deleteArticleAPI += "?article="+this.currentArticleID+"&sid="+_sid.token;
    let _delete = this.subscriptions.push( 
      this.getJSON(_tempAPI).subscribe(data => {
        console.log(data);
        this._router.navigate(['/blog/'+this.currentArticleUserID]);
      })
    );
  }
}
