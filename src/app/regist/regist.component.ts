import { Component } from '@angular/core';
import { ApiConnectionsService } from '../api-connections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent {
showPass:boolean = false;
user={
  nm:'',
  mono:'',
  email:'',
  pass:'',
  addr:''
}
massage: string = ''; // To store the message from the backend api

toglePass1(){
  this.showPass = !this.showPass; 
}

fillDemoRegist(){
  this.user.nm = 'Demo Name';
  this.user.mono = '1234567890';
  this.user.email = 'demo@emai.com';
  this.user.pass = 'Demo123';
  this.user.addr = '123 Demo Street';
}

//password strength moniter
strengthPercent: number = 0;
strengthColor: string = 'red';
strengthText: string = '';
  
updateStrength(){
  const pass = this.user.pass || '';
  let score = 0;

  if (pass.length >= 8) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;

  this.strengthPercent = (score / 4) * 100;

  switch (score) {
    case 0:
    case 1:
      this.strengthText = 'Weak';
      this.strengthColor = '#ef4444'; // red
      break;
    case 2:
      this.strengthText = 'Fair';
      this.strengthColor = '#f97316'; // orange
      break;
    case 3:
      this.strengthText = 'Good';
      this.strengthColor = '#3b82f6'; // blue
      break;
    case 4:
      this.strengthText = 'Strong';
      this.strengthColor = '#10b981'; // green
      break;
  }
}

// backend connection
constructor(private a:ApiConnectionsService, private router: Router){}
//ApiConnectionsService is service page ther is url and endPoints
registerbut(){
  this.a.adduser(this.user).subscribe({
    next:()=>{
      alert("Data inserted sucess.")
    },
    error:(er)=>{
      console.log(er)
    }
  })
}


onRegister() {
    this.a.addvalid(this.user).subscribe({
      next: (res) => {
        this.massage = res;  // will show "Registration successful!"
        this.router.navigate(['/login']); // Redirect to login page after successful registrationnn
      },
      error: (err) => {
        if (err.status === 409) {
          this.massage = err.error;  // "Mobile number already registered!"
        } else {
          this.massage = "Something went wrong!";
        }
      }
    });
  }

}