import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-test-rules',
  templateUrl: './test-rules.component.html',
  styleUrls: ['./test-rules.component.css']
})
export class TestRulesComponent implements OnInit {
  id: any;
  constructor(private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params)=>{
        console.log(params.testId)
        this.id = params.testId;
        
      }

    );
  

  }
  continue(){
    console.log(this.id);
    this.router.navigate(['takeTest/'+this.id])

  }
  cancel(){
    this.router.navigate(['home'])
  }

}
