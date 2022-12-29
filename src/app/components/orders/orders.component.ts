import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  displayedColumns: string[] = ['id', 'userId', 'date', 'products'];
  dataSource = Order_Data;
  
}

export interface PeriodicElement {
  userId: string;
  id: number;
  date: number;
  products: string;
}

const Order_Data: PeriodicElement[] = [
  {id: 1, userId: 'Hydrogen', date: 1.0079, products: 'H'},
  {id: 2, userId: 'Helium', date: 4.0026, products: 'He'},
  {id: 3, userId: 'Lithium', date: 6.941, products: 'Li'},
  {id: 4, userId: 'Beryllium', date: 9.0122, products: 'Be'},
  {id: 5, userId: 'Boron', date: 10.811, products: 'B'},
  {id: 6, userId: 'Carbon', date: 12.0107, products: 'C'},
  {id: 7, userId: 'Nitrogen', date: 14.0067, products: 'N'},
  {id: 8, userId: 'Oxygen', date: 15.9994, products: 'O'},
  {id: 9, userId: 'Fluorine', date: 18.9984, products: 'F'},
  {id: 10, userId: 'Neon', date: 20.1797, products: 'Ne'},
];