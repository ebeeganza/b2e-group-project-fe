import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/data/cart';
import { Product } from 'src/app/data/product';
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

  public products: Product[] = [];
  public grandTotal : number = 0;
  couponCode: any;

  cartData !: MatTableDataSource<Cart>

  post:any

  constructor(public cartService:CartServiceService, 
              public ui: UiService, 
              public orderServces: OrdersService, 
              public productService: ProductService, 
              public couponService: CouponsService,
              ) {
                this.cartSub = this.cartService.CartSubject()
                .subscribe(carts => this.cartData.data = carts)
              }

  private cartSub: Subscription
  

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(x => {
    this.products = x;
    });

    for(const product of this.products){
      this.grandTotal =- this.productService.getCurrentPrice(product);
    }
  }

  getCart() {
    this.cartService.loadUserCart()

    }

  }


  


