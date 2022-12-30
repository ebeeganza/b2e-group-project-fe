import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/data/orders';
import { Product } from 'src/app/data/product';
import { AccountService } from 'src/app/services/account.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  constructor(public orderService: OrdersService,
              public accountService: AccountService,
              public productService: ProductService) {
  }
  ngOnInit(): void {
    console.log(this.orderService.orders)
  }

  displayedColumns: string[] = ['id', 'userId', 'date', 'products', 'totals'];
  displayedColumns2: string[] = ['id', 'date', 'products'];

  userRole = localStorage.getItem('role')
  testDataSource = Order_Data
  dataSource = this.orderService.getOrders()
  dataSource2 = this.orderService.getUserOrders()
  public transactionPanelOpenState = false

  public id: number = -1

  public selectId(id:number): void {
    this.id = id
  }

  public total(data: Order) {
    return data.products.reduce((acc, obj) => acc + this.productService.getCurrentPrice(obj), 0)
  } 



}

export interface PeriodicElement {
  userId: number;
  id: number;
  date: Date;
  products: Product[];
}

const Order_Data: PeriodicElement[] = [
  {id: 1, userId: 11, date: new Date("12-12-2021"), products: []},
  {id: 2, userId: 12, date: new Date("1-12-2022"), products: []},
  {id: 3, userId: 13, date: new Date("12-1-2022"), products: []},
  {id: 4, userId: 14, date: new Date("12-12-2022"), products: []},
  {id: 5, userId: 15, date: new Date("12-12-2000"), products: []},
  {id: 6, userId: 16, date: new Date("12-12-2022"), products: []},
  {id: 7, userId: 17, date: new Date("12-12-2022"), products: []},
  {id: 8, userId: 18, date: new Date("12-12-2022"), products: []},
  {id: 9, userId: 19, date: new Date("12-12-2022"), products: []},
  {id: 10, userId: 20, date: new Date("12-12-2022"), products: []},
];