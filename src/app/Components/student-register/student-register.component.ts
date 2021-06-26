import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  constructor(public fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
    private router: Router) { }
  myForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm();
  }
  submitForm(){
    console.log("Hii");
  }
  reactiveForm() {
    this.myForm = this.fb.group({
      emailId: ['', Validators.email],
      password: ['', Validators.required],
      name:['',Validators.required],
      phoneNumber:['',Validators.required],
      school:['',Validators.required],
      state:['',Validators.required],
      pinCode:['',Validators.required]
    })
  }

}
