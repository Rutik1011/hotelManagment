import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent implements OnInit {    //make some changes by devloper
user:any;                  // user data stored using localStorage
usernm:string='';
isLogIn:boolean=false;

ngOnInit(): void {
    const data=localStorage.getItem("user");
    if(data){
      this.user=JSON.parse(data);
      this.isLogIn=true;            // when user data is present in local storage then only it will set to true
      this.usernm=this.user.nm;
}else{
  this.isLogIn=false;
}
}

constructor(private router:Router){}
logout(){
  localStorage.removeItem("user");
  this.isLogIn=false;
  this.user=null;
  this.router.navigate(['/login']);  // redirect to login page
}
}