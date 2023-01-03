import { Injectable } from '@angular/core';
import { Order } from 'src/app/data/orders';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
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
  private userOrders: Order[] = []
  public userRole: string | undefined
  
  private showError(message: string): void {
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
        },
        error: () => {
          this.showError('Oops, something went wrong')
        }
      })
  }

  public loadUserOrders(): void {
    this.http.get<Order[]>(`http://localhost:8080/orders?userId=${this.accountService.currentUser.value.id}`)
      .pipe(take(1))
      .subscribe({
        next: orders => {
          this.userOrders = orders
          this.getUserOrders()
          },
        error: () => {
          this.showError('Oops, something went wrong')
        }
      })
  }

  public deleteOrder(id: number) {
    this.http.delete(`http://localhost:8080/orders/${id}`)
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
  addOrder(userId: number, orderTotal: number, orderDate: Date, products: string) {
    this.http.post('http://localhost:8080/orders', {
      id: null,
      userId,
      orderTotal,
      orderDate,
      products
    })
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
}
