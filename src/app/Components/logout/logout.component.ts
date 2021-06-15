import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http:HttpClient,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('loggedIn',"false")
    this.router.navigate(['login'])
  }

}
