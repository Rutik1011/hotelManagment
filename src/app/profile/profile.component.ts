import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiConnectionsService } from '../api-connections.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  
})
export class ProfileComponent implements OnInit{

 user: any;               //hold user data
  isLogIn:boolean=false;  // to check if user is logged in or not
 message: string = "";  //hold success or fail update message
 usernm:string=''; // hold user name for display

  constructor(private connection:ApiConnectionsService, private router:Router) { }

  ngOnInit(): void {
    const data = localStorage.getItem("user");    // 🔹 Load user data from localStorage (saved during login)
    if (data) {
      this.user = JSON.parse(data);
      this.isLogIn = true;            // when user data is present in local storage then only it will set to true
      this.usernm = this.user.nm;    //store user name in usernm variable for display
    }else{
      this.isLogIn = false;
    }
  }



 // 🔹 Update profile API call
  updateProfile() {
    this.connection.updateProfile(this.user.id, this.user).subscribe({
      next: res => {
        // Update localStorage with new user data
        localStorage.setItem("user", JSON.stringify(res));
        this.message = "✅ Profile updated successfully!";
      },
      error: err => {
        if (err.status === 404) {
          this.message = "❌ User not found!";
        } else {
          this.message = "❌ Update failed!";
        }
      }
    });
  }




  


  
  logout(){                           //when user click on logout button
    localStorage.removeItem("user");
    this.isLogIn=false;
    this.user=null;
    this.router.navigate(['/login']);  // redirect to login page
  }

}
