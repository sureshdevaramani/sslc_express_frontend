import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {CountdownComponent} from 'ngx-countdown';
//import { image } from './image.const';


@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {
  @ViewChild('countdown') counter: CountdownComponent;

  constructor(private http: HttpClient,private route: ActivatedRoute,private router : Router,private sanitizer: DomSanitizer) { }

  
  dummyObj:any;
  resObj:any;
  displayObj: any = [
    {
      "questionNo":"",
      "question":"",
      "optionA":"",
      "optionB":"",
      "optionC":"",
      "optionD":"",
    }
  ]
  imageSource;
  resImg:any;
  quesId:any;
  examID;any;
  resExm;
  // posObjEx:any={
  //   studentId":'2c9f608179fe6acc0179ff3d49790003',
  //   testId:'2c9fa1407a05c22e017a0bbba15b00d8'
  // }
  showCounter = false;
  ngOnInit(): void {
    
      this.http.get('http://13.59.166.115:8700/sslc-express/question?examId=2c9fa1407a05c22e017a0beee6d20102').subscribe(res=>{
      console.log(res);
      this.resObj = res;
      if(this.resObj.data == null){
        this.displayObj.questionNo= '';
      this.displayObj.question = '';
      this.displayObj.optionA = '';
      this.displayObj.optionB = '';
      this.displayObj.optionC = '';
      this.displayObj.optionD = '';
      this.quesId = '';
      return;
      
      }
      console.log(this.resObj.data.questionSequnceNumber);
      this.displayObj.questionNo= this.resObj.data.questionSequnceNumber;
      this.displayObj.question = this.resObj.data.question;
      this.displayObj.optionA = this.resObj.data.optionA;
      this.displayObj.optionB = this.resObj.data.optionB;
      this.displayObj.optionC = this.resObj.data.optionC;
      this.displayObj.optionD = this.resObj.data.optionD;
      this.quesId = this.resObj.data.questionId;
      if(this.resObj.data.imageUploaded){
        const quesId = this.resObj.data.questionId
        this.http.get('http://13.59.166.115:8700/sslc-express/image?questionId='+quesId+'')
        .subscribe(res=>{
          
          this.resImg = res;
          console.log(this.resImg.data)
           this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.resImg.data.picByte}`);
           this.showCounter = true;
        })
      }else{
        this.showCounter = true;
      }

    })
   
    
   // this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  showMes=false;
  timer(event){
    this.showMes=false;
    console.log(event.action);
    
    if(event.action=="start"){
      console.log("")
    }
    if(event.action=="done"){
      this.showMes = true;
      setTimeout(() => this.counter.restart());
      this.submit();
    }
  }
  color = 'primary'
  options= ['A','B','C','D']
  tempChar=''
  answer ='';
  optionsClicked(event){
    let answer : string;
    answer = event.target.innerText;
    this.answer = answer[0];
    console.log(this.answer);
  }
  submit(){
    this.showCounter = false;
    this.imageSource = null;
    this.http.get('http://13.59.166.115:8700//sslc-express/question?examId=2c9fa1407a05c22e017a0beee6d20102&previousQuestionId='+this.quesId+'&answer='+this.answer+'')
    .subscribe(res=>{

      this.answer=null;
      console.log(res);
      this.resObj = res;
      if(this.resObj.data == null){
        this.displayObj.questionNo= '';
        this.displayObj.question = '';
        this.displayObj.optionA = '';
        this.displayObj.optionB = '';
        this.displayObj.optionC = '';
        this.displayObj.optionD = '';
        this.quesId = '';
        return;
      }
      console.log(this.resObj.data.questionSequnceNumber);
      this.displayObj.questionNo= this.resObj.data.questionSequnceNumber;
      this.displayObj.question = this.resObj.data.question;
      this.displayObj.optionA = this.resObj.data.optionA;
      this.displayObj.optionB = this.resObj.data.optionB;
      this.displayObj.optionC = this.resObj.data.optionC;
      this.displayObj.optionD = this.resObj.data.optionD;
      this.quesId = this.resObj.data.questionId;
      if(this.resObj.data.imageUploaded){
        const quesId = this.resObj.data.questionId
        this.http.get('http://13.59.166.115:8700/sslc-express/image?questionId='+quesId+'')
        .subscribe(res=>{
          
          this.resImg = res;
          console.log(this.resImg.data)
           this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.resImg.data.picByte}`);
           this.showCounter = true;
        })
      }else{
        this.showCounter = true;
      }
      

    })
    
  }
  
}
