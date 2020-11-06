import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  constructor(private httpClient: HttpClient) { }

  postImage(fd : FormData): Observable<string>{
    console.log("fd=======>",fd);
    return this.httpClient.post<string>(`${environment.apiUrl}postimage.php`, fd );
  }

  getImage(_user): Observable<Blob> {
    return this.httpClient.get( `${environment.apiUrl}getimage.php`, { responseType: 'blob' })      
  }
}
