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

  image = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_655998316_2000149920009280219_363765.jpg&imgrefurl=https%3A%2F%2Fwww.inc.com%2Fchristina-desmarais%2F21-books-to-read-if-you-want-to-get-ahead-in-business-life.html&tbnid=BlUCjGvmpXjLRM&vet=12ahUKEwi5-PGggJLxAhW2ynMBHdmZAp0QMygAegUIARDQAQ..i&docid=WpfJGyIp7epdTM&w=1920&h=1080&q=books%20images&ved=2ahUKEwi5-PGggJLxAhW2ynMBHdmZAp0QMygAegUIARDQAQ';
  dummyObj:any;
  resObj:any;
  testId:string;
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
  posObjEx:any={
  }
  showCounter = false;
  ngOnInit(): void {


    //get values form url 
    this.testId = this.route.snapshot.paramMap.get('testId');

    var url = 'http://localhost:8700/sslc-express/start-test?studentId='+localStorage.getItem('studentId')+'&testId='+this.testId;

    this.http.post(url,this.posObjEx).subscribe(res=>{
      if(JSON.parse(JSON.stringify(res)).success == true )
      {
        this.examID = JSON.parse(JSON.stringify(res)).data.examId 
        this.http.get('http://localhost:8700/sslc-express/question?examId='+this.examID).subscribe(res=>{
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
    },err=>{
      console.log(err)
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
    this.http.get('http://localhost:8700//sslc-express/question?examId='+this.examID+'&previousQuestionId='+this.quesId+'&answer='+this.answer+'')
    .subscribe(res=>{
      if(JSON.parse(JSON.stringify(res)).data == null)
      {
        alert('Exam sucessfully completed , thanks for taking the exam')
        this.router.navigate(['home'])
      }
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
