import { Injectable } from '@angular/core';
import { Order } from 'src/app/data/orders';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../account.service';
import { Product } from 'src/app/data/product';
import { ThisReceiver } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private accountService: AccountService) {
    this.loadAllOrders()
     }

  public userId: number | undefined;
  public orders: Order[] = []
  public userOrders: Order[] = []
  public userRole: string | undefined
  private orderSubject: Subject<Order[]> = new Subject()
  
  public showError(message: string): void {
    this._snackBar.open(message, undefined, {duration: 10000})
  }

public loadOrders(): void {
    if (this.accountService.currentUser.value.role == 1) {
      this.loadAllOrders()
    } else {
      this.loadUserOrders()
    }
  }

  public loadAllOrders(): void {
    this.http.get<Order[]>(`http://localhost:8080/orders`)
      .pipe(take(1))
      .subscribe({
        next: orders => {
          this.orders = orders
          this.getOrders()
          this.orderSubject.next(this.orders)
        },
        error: () => {
          this.showError('Oops, something went wrong')
        }
      })
  }

  public loadUserOrders(): void {
    this.http.get<Order[]>(`http://localhost:8080/orders?username=${this.accountService.currentUser.value.email}`)
      .pipe(take(1))
      .subscribe({
        next: orders => {
          this.userOrders = orders
          this.getUserOrders()
          this.orderSubject.next(this.userOrders)
          },
        error: () => {
          this.showError('Oops, something went wrong')
        }
      })
  }

  public deleteOrder(id: number) {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("email", this.accountService.currentUser.value.email)
    queryParams = queryParams.append("password", this.accountService.currentUser.value.password)
    this.http.delete(`http://localhost:8080/orders/${id}`, { params: queryParams })
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.loadAllOrders()
      },
      error: () => {
        this.showError('Failed to cancel order')
      }
    })
    }

  public getOrders(): Order[] {
    return this.orders
  }

  getUserOrders() {
    return this.userOrders
  }

  // userId this.accountService.currentUser.value.id 
  addOrder(email: string, orderTotal: number, orderDate: Date, products: Product[]) {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("email", this.accountService.currentUser.value.email)
    queryParams = queryParams.append("password", this.accountService.currentUser.value.password)
    this.http.post('http://localhost:8080/orders', {
      id: null,
      email,
      orderTotal,
      orderDate,
      products
    } , { params: queryParams })
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.getOrders()
      },
      error: () => {
        this.showError('Failed to add order')
      }
    })
  }

  orderSubjector(): Observable<Order[]> {
    return this.orderSubject.asObservable()
  }
}
