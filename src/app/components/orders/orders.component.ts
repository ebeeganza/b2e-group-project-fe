import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConnectableObservable } from 'rxjs';
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
export class OrdersComponent implements AfterViewInit {

  constructor(public orderService: OrdersService,
              public accountService: AccountService,
              public productService: ProductService) {
    this.getData;
  }
ngAfterViewInit(): void {
  this.orderService.loadAllOrders()
  console.log(this.dataSource.data)
}

  displayedColumns: string[] = ['action','id', 'userId', 'date', 'products', 'totals'];
  displayedColumns2: string[] = ['action', 'id', 'date', 'products'];

  public dataSource = new MatTableDataSource<Order>()
  public dataSource2 = this.orderService.getUserOrders()
  public transactionPanelOpenState = false

  public id: number = -1

  public selectId(id:number): void {
    this.id = id
  }

  // public total(data: Order) {
  //   return data.products.reduce((acc, obj) => acc + this.productService.getCurrentPrice(obj), 0)
  // } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  getData() {
    this.orderService.loadAllOrders()
    this.dataSource.data = this.orderService.orders
  }

}

