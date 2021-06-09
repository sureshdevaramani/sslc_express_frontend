import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder, private http: HttpClient,private route: ActivatedRoute,
    private router : Router) { }

  myForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm()
  }
  reactiveForm() {
    this.myForm = this.fb.group({
      emailId: ['',Validators.email],
      password: ['',Validators.required]
      
      
      //subjects: [this.SubjectsArray]
    })
  }
  submitForm(){
    this.router.navigate(['test'])
  }

}
