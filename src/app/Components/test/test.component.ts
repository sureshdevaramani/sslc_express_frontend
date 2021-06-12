import { Component, OnInit } from '@angular/core';
import { eventNames } from 'process';
import {NgxImageCompressService} from 'ngx-image-compress';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { CompressImageService } from 'src/app/Services/compress-image.service';
import { take } from 'rxjs/operators';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFilesService } from 'src/app/services/upload-files.service';


import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  dummFiles:any[];
  willDownload = false;
  dataString:any;
  image:any ;
  theCompressed= new FormData();
  testId:any;
  resData:any;
  constructor(private compressImage: CompressImageService,private http: HttpClient,private route: ActivatedRoute,
    private router : Router,private uploadService: UploadFilesService) {}

    posObj: any ={
    "testName": "test1",
    "organisationId": "2c9fa14079f767ab0179fee065860015",
    "questions":[]

  }
  posObjFile: any ={
    "imageFile": ""
  }

  ngOnInit(): void {
  }
   
  onFileChange(ev) {
    //console.log(ev)
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    let i = 0;
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      //console.log(workBook)
      jsonData = workBook.SheetNames.reduce((initial,su) => {
        
        
        const sheet = workBook.Sheets[su];
       // console.log(workBook.Sheets[su])
        if(i==0){
        initial[su] = XLSX.utils.sheet_to_json(sheet);
        i++;
      }
        //console.log(initial)
        //i++;
        return initial;
        
        
      }, {});
      
      let ques=jsonData.Suresh
      this.posObj.questions=ques
      this.http.post('http://13.59.166.115:8700/sslc-express/test/questions',this.posObj).subscribe(response=>{
        console.log(response)
        this.resData = response;
        this.testId= this.resData.data;
      })
      //.log(this.posObj)
      //console.log(ques)
      const dataString = JSON.stringify(jsonData);
      this.dataString = ques;
      //console.log(dataString)
     // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
     
    }
    reader.readAsBinaryString(file);
  }
  
  onFileUpdate(event) {
    // console.log(event.target.files[0].type)
    // console.log(event.target.files[0].size)
    const upload = new FormData();
    
    const files = event.target.files[0];
    
    console.log(upload)
    //this.posObj.push(upload)
    if (files.length === 0) return;
   
    let image: File = event.target.files[0]
    console.log(`Image size before compressed: ${image.size} bytes.`)

    this.compressImage.compress(image)
      .pipe(take(1))
      .subscribe(compressedImage => {

        console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
       
        const reader = new FileReader();
        upload.append('imageFile',compressedImage,compressedImage.name)
   
        this.http.post('http://13.59.166.115:8700/sslc-express/test/'+this.testId+'/1/image',upload)
        .subscribe(res=>{
          console.log(res)
        }) 
         reader.readAsDataURL(compressedImage);
         console.log(reader)
         reader.onload = _event => {
        this.image = reader.result 
       // console.log(this.image)
      };
        // now you can do upload the compressed image 
      })
     // console.log(this.image)


  }
  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.dummFiles.push(event.target.files[0])
    console.log(this.dummFiles)
  }

  uploadFiles(): void {
    this.message = [];
  
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            //this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
         // this.fileInfos = this.uploadService.getFiles();
        });
    }
  }

  





}
