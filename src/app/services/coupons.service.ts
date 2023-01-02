import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Coupon } from '../data/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  // public id: number,
  // public couponCode: string,
  // public Discount: number,
  // public StartDate: Date,
  // public EndDate : Date,
  // public orderTotalMin: number,

  public couponSubject: BehaviorSubject<Coupon[]> = new BehaviorSubject<Coupon[]>([])

  //Temporary - donot know how to insert new date inside the coupon array
  public couponList: Coupon[] = [
    // new Coupon(0,'abc123',20,2023/01/02,1,1),
    // new Coupon(1,'abc321',15,1,1,1),
  ]

  constructor(private http:HttpClient) { 
    this.couponSubject.next(this.couponList)

  }

  //Creating CRUD for coupons so shopkeep can use

  //GET
  updatedCoupons(): void {
    this.http.get<Coupon[]>('http://localhost8080/coupon')
      .pipe(take(1))
      .subscribe({
        next: (coupons) => this.couponSubject.next(coupons),
        error: (err) => console.log("Error getting categories")
      })
  }
  // PUT
  putCoupons(getCoupons: Coupon): void {
    this.http.put('http://localhost:8080/coupon', getCoupons)
      .pipe(take(1))
      .subscribe({
        next: () => this.getCoupons(),
        error: (err) => console.log("Error updating category")
      })
  }
  // POST
  createCoupons(newCoupons: Coupon): void {
    this.http.post('http://localhost:8080/coupon',newCoupons) 
      .pipe(take(1))
      .subscribe({
        next: () => this.getCoupons(),
        error: (err) => console.log("Error creating category") 
      })
  }
  // DELETE
  deleteCategory(couponId: Number): void {
    this.http.delete(`http://localhost:8080/coupon/${couponId}`)
    .pipe(take(1))
    .subscribe({
      next: () => this.getCoupons(),
      error: (err) => console.log(`Error deleting category ${couponId}`)
    })
  }

  getCoupons(): Observable<Coupon[]> {
    return this.couponSubject.asObservable()
  }


}
