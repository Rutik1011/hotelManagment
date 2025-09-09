import { Component } from '@angular/core';
import { ApiConnectionsService } from '../api-connections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //for show pass
showPassword=false;
togglePassword(){
  this.showPassword=!
  this.showPassword;
}
//for demoDataFill
user={
  mono:'',
  pass:''
}
fillDemo(){
  this.user.mono='demo@domail.com';
  this.user.pass='Demo123';
}

//java backend connection login


constructor(private api:ApiConnectionsService, private router: Router) {}  //we use here Router when user select login go on another components html page

login(){
 this.api.loginByMono(this.user).subscribe({
      next: (res: any) => {
        console.log("Login Success", res);

        // store user in localStorage/sessionStorage if needed
        localStorage.setItem("user", JSON.stringify(res));

        // redirect to home page
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert("Invalid Credentials!");
        console.error(err);
      }
    });
}
}