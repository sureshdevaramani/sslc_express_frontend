import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  constructor(private http: HttpClient,private route: ActivatedRoute,private router : Router,
    private sanitizer: DomSanitizer) { }

  resBody:any= {
    "questionNo":"",
    "question":"",
    "optionA":"",
    "optionB":"",
    "optionC":"",
    "optionD":"",
    "yourAnswer":"",
    "status":"",
    "image":""
  }
  displayObj: any[] = []
  status:any;
  resRes:any;
  resImg:any;
  rightAns: number;
  wrognAns: number;
  ngOnInit(): void {
    this.http.get('http://13.59.166.115:8700//sslc-express/result?studentId=2c9f608179fe6acc0179ff3d49790003&testId=2c9fa1407a05c22e017a0bcd2f7900e7')
    .subscribe(res=>{
      this.rightAns = 0;
      this.wrognAns = 0;
      this.resRes = res;
      console.log(this.resRes.data)

      this.resRes = res;
      // for(let i = 0; i< this.resRes.data.length;i++){
      //   this.displayObj.push(this.resBody);
      // }
      console.log(this.resRes.data[0].questionSequnceNumber)
      for(let i = 0;i< this.resRes.data.length;i++){
        let resBody:any= {
          "questionNo":"",
          "question":"",
          "optionA":"",
          "optionB":"",
          "optionC":"",
          "optionD":"",
          "yourAnswer":"",
          "status":"",
          "image":"",
          "correctOption":""
        }
        resBody.questionNo = this.resRes.data[i].questionSequnceNumber;
        resBody.question = this.resRes.data[i].question;
        resBody.optionA = this.resRes.data[i].optionA;
        resBody.optionB = this.resRes.data[i].optionB;
        resBody.optionC = this.resRes.data[i].optionC;
        resBody.optionD = this.resRes.data[i].optionD;
        resBody.yourAnswer = this.resRes.data[i].answer;
        if(resBody.yourAnswer=="undefined"){
          resBody.yourAnswer = 'C'
        }
        resBody.status = this.resRes.data[i].status;
        if(resBody.status=='CORRECT'){
          this.rightAns = this.rightAns+1;
        }else{
          this.wrognAns = this.wrognAns+1;
        }
        resBody.correctOption = this.resRes.data[i].correctOption;
        //console.log(resBody)
        if(this.resRes.data[i].imageUploaded){
          const quesId = this.resRes.data[i].questionId;
          this.http.get('http://13.59.166.115:8700/sslc-express/image?questionId='+quesId+'')
          .subscribe(res=>{
            
            this.resImg = res;
            //console.log(this.resImg.data)
            resBody.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.resImg.data.picByte}`);
            this.displayObj.push(resBody);
          })

        }else{
          this.displayObj.push(resBody);
        }
        
        // console.log(this.displayObj)
      }
      console.log(this.displayObj)
    });

    
  }


}
