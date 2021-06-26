import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  testsDetails: any[] = [
    {
      testName: "Test 1",
      cost: 100,
      creatorName: "Creator1",
      status: "new"
    },
    {
      testName: "Test 2",
      cost: 200,
      creatorName: "Creator2",
      status: "purchased"
    },
    {
      testName: "Test 3",
      cost: 300,
      creatorName: "Creator3",
      status: "attended"
    }
  ]
  constructor(private http:HttpClient,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    console.log(this.router.url);
    if(localStorage.getItem("loggedIn") != "true")
    {
      this.router.navigate(['login'])
    }

    var body = {
        "studentId":"2c9f608179fe6acc0179ff3d49790003",
        "searchPhrase":""
    }
    
    this.http.put("http://13.59.166.115:8700/sslc-express/tests",body).subscribe(res=>{
    console.log(res)
    this.testsDetails = JSON.parse(JSON.stringify(res)).data;
    },err=>{

    })
  }

  seeResult(){
    alert("see result")
  }

  startTest(testId){
   // console.log(testId)
    this.router.navigate(['rules/'+testId])
  }

}
