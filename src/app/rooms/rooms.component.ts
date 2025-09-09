import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  user: any;
  isLogIn: boolean = false;

  showBooking: boolean = false;
  bookingData: any = {
    name: '',
    mono: '',
    noperson: '',
    checkIn: '',
    checkOut: '',
    totalPrice: 0,
    roomNo: '',
    roomType: '',
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data);
      this.isLogIn = true;
    }
  }

logout() {
    localStorage.removeItem('user');
    this.isLogIn = false;
    this.user = null;
    this.router.navigate(['/login']); // redirect to login page
  }

  openBooking(room: string, roomNo: string, roomType: string) {
    this.bookingData = {
      name: this.user?.nm || '',
      mono: this.user?.mono || '',
      noperson: '',
      checkIn: '',
      checkOut: '',
      totalPrice: 0,
      roomNo,
      roomType,
    };
    this.showBooking = true;
  }

  closeBooking() {
    this.showBooking = false;
  }

  calculateDays(checkIn: string, checkOut: string): number {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = (outDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24);
    return diff > 0 ? diff : 0;
  }

  updatePrice() {
    const days = this.calculateDays(
      this.bookingData.checkIn,
      this.bookingData.checkOut
    );
    if (days > 0) {
      const base = 1000;
      const perPerson = 150;
      const persons = this.bookingData.noperson || 1;

      this.bookingData.totalPrice = (base + persons * perPerson) * days;
    } else {
      this.bookingData.totalPrice = 0;
    }
  }

  // ✅ Submit booking and create Razorpay order
  submitBooking() {
    this.updatePrice();

    const bookingPayload = {
      roomNo: Number(this.bookingData.roomNo),
      roomType: this.bookingData.roomType,
      userNm: this.bookingData.name,
      moNO: Number(this.bookingData.mono),
      noOfPerson: Number(this.bookingData.noperson),
      checkIn: this.bookingData.checkIn,
      checkout: this.bookingData.checkOut,
      amount: this.bookingData.totalPrice, // RUPEES
      currency: 'INR',
      status: 'CREATED'
    };

    this.http
      .post('http://localhost:8080/api/payments/create-order', bookingPayload)
      .subscribe({
        next: (order: any) => {
          console.log("Backend order:", order);

          const options = {
            key: 'rzp_test_RB3OTH7i4F6HHp',
            amount: order.amount, // already in paise
            currency: 'INR',
            name: 'HotelEase',
            description: 'Room Booking Payment',
            order_id: order.id,
            handler: (response: any) => {
              alert('Payment Successful ✅ ' + response.razorpay_payment_id);
              this.router.navigate(['/Booking']);
              this.http.post(
                `http://localhost:8080/api/payments/update-status/${order.id}/PAID`,
                {}
              ).subscribe();
            },
            prefill: {
              name: this.bookingData.name,
              email: 'test@demo.com',
              contact: this.bookingData.mono,
            },
            theme: { color: '#3399cc' },
            method: {
              upi: true,
              card: true,
              netbanking: true,
              wallet: true
            }
          };

          const rzp1 = new (window as any).Razorpay(options);
          rzp1.open();
        },
        error: (err) => {
          alert('Order creation failed ❌');
          console.error(err);
        },
      });
  }
}
