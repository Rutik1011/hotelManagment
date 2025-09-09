import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistComponent } from './regist/regist.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomsComponent } from './rooms/rooms.component';
import { StaffComponent } from './staff/staff.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
{path:"reg", component:RegistComponent},
{path:"home",component:HomeComponent},
{path:"rooms",component:RoomsComponent},
{path:"profile",component:ProfileComponent},
{path:"staff",component:StaffComponent},
{path:"Booking",component:BookingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
