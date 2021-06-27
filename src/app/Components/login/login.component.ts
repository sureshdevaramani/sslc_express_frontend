import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  loginRes:any;
  constructor(public fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
    private router: Router) { }

  myForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm()

  }
  reactiveForm() {
    this.myForm = this.fb.group({
      emailId: ['', Validators.email],
      password: ['', Validators.required]

    })
  }
  register(){

    this.router.navigate(['studentRegister'])
  }
  submitForm() {
    var emailId = this.myForm.get('emailId').value
    var password = this.myForm.get('password').value

    var body = {
      'emailId': emailId,
      'password': password
    }

    this.http.post("http://13.59.166.115:8700/sslc-express/login", body).subscribe(res => {
       console.log(res)
       this.loginRes=res;

      if (JSON.parse(JSON.stringify(res)).success == true) {
        localStorage.setItem("studentId",JSON.parse(JSON.stringify(res)).data.studentId);
        localStorage.setItem("loggedIn",'true');
        this.router.navigate(['home'])
        if(this.loginRes.data.role=="student"){
        localStorage.setItem("studentId",JSON.parse(JSON.stringify(res)).data.studentId);
        localStorage.setItem("loggedIn",'true');
        this.router.navigate(['home'])
        }else{
        localStorage.setItem("organziationId",JSON.parse(JSON.stringify(res)).data.organziationId);
        localStorage.setItem("loggedIn",'true');
        this.router.navigate(['test'])
        }
      }
    }, err => {
      console.log(err);
    })
    // alert('button clicked')
    // this.router.navigate(['test'])

  }

}
