import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { CartServiceService } from 'src/app/services/cart.service.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  public products: any = [];
  public grandTotal : number = 0;
  couponCode: any;

  constructor(public cart:CartServiceService, public ui: UiService, public orderServces: OrdersService, public productService: ProductService) {}

  ngOnInit(): void {
    this.cart.getProducts()
    .subscribe(x => {
    this.products = x;
    this.grandTotal=this.cart.getTotalPrice();
    });

  }
}

