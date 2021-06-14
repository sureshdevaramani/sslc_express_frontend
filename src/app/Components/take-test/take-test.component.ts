import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';


@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {

  constructor(private http: HttpClient,private route: ActivatedRoute,
    private router : Router) { }
  image = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_655998316_2000149920009280219_363765.jpg&imgrefurl=https%3A%2F%2Fwww.inc.com%2Fchristina-desmarais%2F21-books-to-read-if-you-want-to-get-ahead-in-business-life.html&tbnid=BlUCjGvmpXjLRM&vet=12ahUKEwi5-PGggJLxAhW2ynMBHdmZAp0QMygAegUIARDQAQ..i&docid=WpfJGyIp7epdTM&w=1920&h=1080&q=books%20images&ved=2ahUKEwi5-PGggJLxAhW2ynMBHdmZAp0QMygAegUIARDQAQ';
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
  
  ngOnInit(): void {
    this.http.get('http://13.59.166.115:8700/sslc-express/question?examId=2c9fa1407a05c22e017a0b44b87100c7').subscribe(res=>{
      console.log(res);
      this.resObj = res;
      console.log(this.resObj.data.questionSequnceNumber);
      this.displayObj.questionNo= this.resObj.data.questionSequnceNumber;
      this.displayObj.question = this.resObj.data.question;
      this.displayObj.optionA = this.resObj.data.optionA;
      this.displayObj.optionB = this.resObj.data.optionB;
      this.displayObj.optionC = this.resObj.data.optionC;
      this.displayObj.optionD = this.resObj.data.optionD;


    })
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

    }
  }
  color = 'primary'
  optionsClicked(event){
    let answer :string;
    answer = event.target.innerText
    console.log(answer[0]);
  }

  
}
