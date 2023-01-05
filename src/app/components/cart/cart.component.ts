import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/data/cart';
import { Product } from 'src/app/data/product';
import { AccountService } from 'src/app/services/account.service';
import { CartServiceService } from 'src/app/services/cart.service.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  // Cart data
  // public id: number,
  // public UserId: number,
  // public products: Product[]

  public products: any = [];
  public grandTotal : number = 0;
  couponCode: any;

  constructor(public cart:CartServiceService, 
              public ui: UiService, 
              public orderServces: OrdersService, 
              public productService: ProductService, 
              public couponService: CouponsService,
              ) {

              }

  ngOnInit(): void {
    this.cart.getProducts()
    .subscribe(x => {
    this.products = x;
    });

    for(const product of this.products){
      this.grandTotal =- product.price;
    }
  }

  getCart():void{
    this.cart.getOnCart()
    }



  }


