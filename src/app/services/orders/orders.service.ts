import { Injectable } from '@angular/core';
import { Order } from 'src/app/data/orders';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../account.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private accountService: AccountService) {
      const userRole = localStorage.getItem('role')
     }

  public userId: number | undefined;
  private orders: Order[] = []
  private userOrders: Order[] = []
  public userRole: string | undefined
  
  private showError(message: string): void {
    this._snackBar.open(message, undefined, {duration: 10000})
  }

private loadOrders(): void {
    if (this.userRole = "shopkeeper") {
      this.loadAllOrders()
    } else {
      this.loadUserOrders()
    }
  }

  private loadAllOrders(): void {
    this.http.get<Order[]>(`http://localhost:8080/orders`)
      .pipe(take(1))
      .subscribe({
        next: orders => {
          this.orders = orders
        },
        error: () => {
          this.showError('Oops, something went wrong')
        }
      })
  }

  private loadUserOrders(): void {
    this.http.get<Order[]>(`http://localhost:8080/orders?userId=${this.userId}`)
      .pipe(take(1))
      .subscribe({
        next: orders => {
          this.userOrders = orders
          },
        error: () => {
          this.showError('Oops, something went wrong')
        }
      })
  }

  deleteOrder(id: number) {
    this.http.delete(`http://localhost:8080/orders/${id}`)
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.getUserOrders()
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

}
