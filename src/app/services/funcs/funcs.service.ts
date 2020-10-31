import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FuncsService {
  constructor() { }
  // Color Functions
  lightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  }
  getContrastYIQ(hexcolor){
    let r = 255-parseInt(hexcolor.substr(0,2),16);
    let g = 255-parseInt(hexcolor.substr(2,2),16);
    let b = 255-parseInt(hexcolor.substr(4,2),16);
    let contrast = this.trans2digit(r)+this.trans2digit(g)+this.trans2digit(b);
    return contrast;
  }
  trans2digit(val){
    val = val.toString(16);
    if (val.toString().length == 1) {
      val = "0" + val;
    }
    return val;
  }

  // Image Functions
  checkImageUrl(str,cata){
    let _imgUrl = "";
    if (str.substring(0, 4).toLowerCase() === 'http'){
      _imgUrl = str;
    }else{
      _imgUrl = "https://javy.hardmouse.com/assets/"+cata+"/"+str;
    }
    return _imgUrl;
  }
  removeBlank(_str){
    return _str.replace(/(\r\n|\n|\s|\r)/gm, "");
  }
  strToObj(_str){
    let _imgArr = _str.split(',');
    return _imgArr;
  }
  stripHTML(_str){
    return _str.replace(/(<([^>]+)>)/gi, "");
  } 
  checkVideoUrl(_video){
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var matches = _video.match(p);
    if(matches){
        return matches[0];
    }else if(_video.length == 11 && !_video.includes('http',0,4)){
    		return "https://www.youtube.com/embed/"+_video;
    }else{
    		return false;
    }
  }
  removeImg(_str){
    return _str.replace(/<img[^>]*>|<iframe.*>.*?<\/iframe>|<video.*>.*?<\/video>|<embed.*>.*?<\/embed>/g,"");
  }
  escapeSpecialCaseChar(_str) {
    return _str.replace(/[-[\]{}()'"<>*+?.,\\^$|#\s]/g, '\\$&');
  }
  isUrlValid(_url) {
    if(_url){
    var res = _url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      if(res == null){
        return false;
      }else{
        return true;
      }
    }
  }
  shuffleJSON(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}
}
// <iframe.*>.*?<\/iframe>