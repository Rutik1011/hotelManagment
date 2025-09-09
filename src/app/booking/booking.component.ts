import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  // heder bar 
    user:any;
    isLogIn:boolean=false;
    
    ngOnInit(): void {
        const data=localStorage.getItem("user");
        if(data){
          this.user=JSON.parse(data);
          this.isLogIn=true;            // when user data is present in local storage then only it will set to true
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
// heder bar end







// demo data

 bookings = [
    {
      roomNo: 101,
      roomType: '1RK Room',
      name: 'Rutik Kale',
      mobileNo: '9876543210',
      noOfPersons: 2,
      checkIn: '2025-09-05',
      checkOut: '2025-09-07',
      status: 'Success'
    },
    {
      roomNo: 102,
      roomType: '1BHK Room',
      name: 'Avni Guest',
      mobileNo: '9123456780',
      noOfPersons: 3,
      checkIn: '2025-09-10',
      checkOut: '2025-09-13',
      status: 'Fail'
    },
    {
      roomNo: 103,
      roomType: '2BHK Room',
      name: 'Lovely Wifey',
      mobileNo: '9988776655',
      noOfPersons: 4,
      checkIn: '2025-09-15',
      checkOut: '2025-09-20',
      status: 'Success'
    }
  ];


}
