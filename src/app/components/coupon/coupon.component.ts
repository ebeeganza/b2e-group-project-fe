
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/data/coupon';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  couponCode: String | undefined;
  
  constructor(private http:HttpClient)
  {

  }

  ngOnInit(): void {
  }

  applyCoupon(){
    this.http.get(`http://localhost:8080/coupons/${this.couponCode}`).subscribe(coupon => {
      //Update the cart using the copuon detials
      // ...
      //Update the user interface to reflec the changes to the cart
      //...
    });
  }



}
