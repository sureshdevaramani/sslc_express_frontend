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


      //subjects: [this.SubjectsArray]
    })
  }
  submitForm() {
    var emailId = this.myForm.get('emailId').value
    var password = this.myForm.get('password').value

    var body = {
      'emailId': emailId,
      'password': password
    }

    this.http.post("http://localhost:8700/sslc-express/user/login", body).subscribe(res => {
       
      if (JSON.parse(JSON.stringify(res)).success == true) {
        localStorage.setItem("studentId",JSON.parse(JSON.stringify(res)).data.userId);
        localStorage.setItem("loggedIn",'true');
        this.router.navigate(['home'])

      }
    }, err => {
      console.log(err);
    })
    // alert('button clicked')
    // this.router.navigate(['test'])

  }

}
