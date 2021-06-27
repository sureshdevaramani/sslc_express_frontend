import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnChanges {

  isLoggedIn = localStorage.getItem('loggedIn')
  
  showLogout = this.isLoggedIn=="true"?true:false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private route: ActivatedRoute,private router : Router) {}
  ngOnInit(){
    console.log(this.router.url);
    console.log(this.isLoggedIn);
    console.log(this.showLogout);
    // if(this.isLoggedIn == "false"){
    //   this.showLogout = false;
    // }else{
    //   this.showLogout = true;
    // }
  }

  ngOnChanges(change: SimpleChanges){
    console.log(change.showLogout)
    this.isLoggedIn = localStorage.getItem('loggedIn')
    this.showLogout = this.isLoggedIn=="false"?false:true;
  }

}
