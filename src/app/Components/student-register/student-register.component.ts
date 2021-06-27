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
  regiRes:any;

  ngOnInit(): void {
    this.reactiveForm();
  }
  submitForm(){
    console.log(this.myForm);

    var emailId = this.myForm.get('emailId').value;
    var userName = this.myForm.get('name').value;
    var contactNumber = this.myForm.get('phoneNumber').value;
    var instituationName = this.myForm.get('schoolName').value;
    var state = this.myForm.get('state').value;
    var pinCode = this.myForm.get('pinCode').value;
 
    var body = {
      "userName":userName,
      "emailId":emailId,
      "instituationName":instituationName,
      "contactNumber":contactNumber,
      "state":state,
      "pincode":pinCode
    }
    if(this.myForm.valid){
    this.http.post('http://13.59.166.115:8700/sslc-express/user',body)
    .subscribe(res=>{
      console.log(res)
      this.regiRes = res;
      if(this.regiRes.success){
        alert("User Registerted Successfully!!!");
        this.router.navigate(['login'])
      }
       
     
    },err=>{
      alert("User Details("+this.myForm.get('emailId').value+") Already Exsist")
      this.router.navigate(['studentRegister'])
    })
  }
  else{
    this.myForm.reset();
    alert("All Fields are Mandatory!!!")
    
  }

  }
  reactiveForm() {
    this.myForm = this.fb.group({
      emailId: ['', Validators.email],
      
      name:['',Validators.required],
      phoneNumber:['',Validators.required],
      schoolName:['',Validators.required],
      state:['',Validators.required],
      pinCode:['',Validators.required]
    })
  }

}
