import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
