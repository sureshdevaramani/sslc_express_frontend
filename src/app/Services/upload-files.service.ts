import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
 // private baseUrl = 'http://13.59.166.115:8700/sslc-express/test/2c9fa14079f767ab0179f9cb135a0004/1/image';

  constructor(private http: HttpClient) { }

  uploadImage(file: File,testId:any,quesNo:any): Observable<HttpEvent<any>> {
    const baseUrl = 'http://13.59.166.115:8700/sslc-express/'+testId+'/'+quesNo+'/image';
    const formData: FormData = new FormData();

    formData.append('imageFile', file,file.name);

    const req = new HttpRequest('POST', `${baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  uploadExcel(posObj: any): Observable<HttpEvent<any>>{
    const baseUrl = 'http://13.59.166.115:8700/sslc-express/questions';

    let response :any;
    this.http.post(baseUrl,posObj).subscribe(res=>{
      response = res
    })
    
    return response;

  }

  
}