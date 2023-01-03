import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Coupon } from 'src/app/data/coupon';
import { CouponsService } from 'src/app/services/coupons.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnDestroy{
  public newCoupon: Coupon = new Coupon(-1,'',-1,-1,new Date(),new Date())
  public dataSource: MatTableDataSource<Coupon> = new MatTableDataSource<Coupon>([])
  public couponSub: Subscription

  public columnsToDisplay = ['id','code','discount','orderTotalMinimum','startDate','endDate']
  
  constructor(public ui: UiService, public couponService: CouponsService){
    this.couponSub = this.couponService.getCoupons()
      .subscribe(coupons => this.dataSource.data = coupons)
  }


  ngOnDestroy(){
    this.couponSub.unsubscribe()
  }








  // applyCoupon(){
  //   this.http.get(`http://localhost:8080/coupons/${this.couponCode}`).subscribe(coupon => {
  //     //Update the cart using the copuon detials
  //     // ...
  //     //Update the user interface to reflec the changes to the cart
  //     //...
  //   });
  // }



}
