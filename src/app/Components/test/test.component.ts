import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
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
//import { Console } from 'console';

// in bytes, compress images larger than 1MB
const fileSizeMax = 1 * 1024 * 1024
// in pixels, compress images have the width or height larger than 1024px
const widthHeightMax = 1024
const defaultWidthHeightRatio = 1
const defaultQualityRatio = 0.7


type AOA = any[][];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  orgName="Organaisation1"
  selectedFiles?: FileList;
  progressInfos:any;
  message: string;
  errMes:string;
  dummFiles:any[];
  willDownload = false;
  dataString:any;
  image:any ;
  theCompressed= new FormData();
  testId:any;
  resData:any;
  showProgres = false;
  tempProgress:any;
  tempFile:File;
  tempMes:any;
  sizeError=false;
  showExError=false;
  bufferValue :any;

  constructor(private compressImage: CompressImageService,private http: HttpClient,private route: ActivatedRoute,
    private router : Router,private uploadService: UploadFilesService) {}
    @ViewChild('testName') testName: ElementRef;
    posObj: any ={
    "testName": "test1",
    "organisationId": "2c9fa1407a05c22e017a06988e520000",
    "questions":[]

  }
  posObjFile: any ={
    "imageFile": ""
  }

  ngOnInit(): void {
  }
   
  onFileChange(ev) {
    //console.log(ev)
    this.showExError = false;
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    let i = 0;
    
    reader.onload = (event) => {
      console.log(this.testName)
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
     

      jsonData = workBook.SheetNames.reduce((initial,su) => {
        const sheet = workBook.Sheets[su];
        
        if(i==0){
        initial[su] = XLSX.utils.sheet_to_json(sheet);
        i++;
      }
        return initial;
      }, {});
    
      let sheetName = workBook.SheetNames[0]
      
      let ques=jsonData[sheetName]
      console.log(jsonData)
      console.log(ques[0].question)
      this.posObj.questions = ques;
      this.dataString = null;
      this.http.post('http://13.59.166.115:8700/sslc-express/questions',this.posObj).subscribe(response=>{
        console.log(response);
        this.resData = response;
        this.testId= this.resData.data;
       
        if(this.resData.message=="sucessful"){
          this.dataString = ques;
        }else{
          console.log(JSON.parse(JSON.stringify(response)).message);
        };
        
      },error=>{
        this.showExError = true;
        console.log(error);

      });

     // console.log(this.uploadExcel(this.posObj));
      // console.log(this.uploadExcel(this.posObj))
      // console.log(this.resData.message)
      // if(this.resData.message=="sucessful"){
      //   this.dataString = ques;
      // }
      
    }
    reader.readAsBinaryString(file);
    
  }
  
  onFileUpdate(event,quesNo) {
    this.message = null;
    this.errMes = null;
    const files = event.target.files[0];
    
    if (files.length === 0) return;
     console.log(event.target.files[0].size)
     var fileSize = event.target.files[0].size;
     this.tempMes= quesNo;
     this.sizeError = false;
     if(fileSize > 10000000){
      this.sizeError = true;
       return;
     }
    const upload = new FormData();
    this.tempProgress = quesNo;
    let image: File = event.target.files[0]
    this.progressInfos = 0;
    if (image) {
      this.uploadService.uploadImage(image,this.testId,quesNo).subscribe(
        (event: any) => {
          //console.log(event)
          if (event.type === HttpEventType.UploadProgress) {
            //console.log(event.loaded)
            this.progressInfos = Math.round(100 * event.loaded / event.total);
            this.tempProgress = this.progressInfos == 100?0:quesNo;
            this.bufferValue = 100- this.progressInfos;
            //console.log(this.progressInfos)
          } 
          else if (event instanceof HttpResponse) {
            console.log(event.body)
            this.message= 'Image uploaded the file successfully: ' + image.name;
           
            //this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos = 0;
          this.errMes = 'Could not upload the file: ' + image.name;
          
         // this.fileInfos = this.uploadService.getFiles();
        });
    }
  
    // this.compressImage.compress(image)
    //   .pipe(take(1))
    //   .subscribe(compressedImage => {
    //     this.tempFile = compressedImage ;
    //     console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
    //     endTime = performance.now();
    //     console.log(endTime)
    //     console.log(Math.round(endTime-startTime));
    //     sleep = Math.round(endTime-startTime)
    //     // now you can do upload the compressed image 
    //   })
      //sleep = 60000;
     // console.log(this.image)
  }
  uploadExcel(posObj:any){
    this.http.post('http://13.59.166.115:8700/sslc-express/questions',posObj).subscribe(response=>{
        //console.log(response)
        this.resData = response;
        console.log(this.resData)
      });
      console.log(this.resData);
      return this.resData
  }
  
 
}



