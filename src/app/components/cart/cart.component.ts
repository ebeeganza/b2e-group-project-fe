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
export class CartComponent  {
  // Cart data
  // public id: number,
  // public UserId: number,
  // public products: Product[]

  public products: Product[] = [];
  public grandTotal: number = 0;
  couponCode: any;

  cartData !: MatTableDataSource<Cart>

  post: any

  constructor(public cartService: CartServiceService,
    public ui: UiService,
    public orderServces: OrdersService,
    public productService: ProductService,
    public couponService: CouponsService,
    public accountService : AccountService
  ) {
    cartService.cartSubject.subscribe((cart) => {
      this.products = cart.products
      this.grandTotal = this.getTotal()
    })
    

    accountService.currentUser.subscribe((user) => {
      console.log("New user logged on.")
      if(accountService.userIsGuest()){
        // set cart back to empty or load from local storage
        console.log("User is guest")
        cartService.logoutCart()
      } else if (accountService.userIsCustomer()){
        // get user cart from cartService db
        console.log("User is customer")

        cartService.loadUserCart();
      }
    })
  }

/*
  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(x => {
        this.products = x;
      });

    for (const product of this.products) {
      this.grandTotal = - this.productService.getCurrentPrice(product);
    }
  }
  */

  getTotal() {
    let grandTotal = 0;
    for (const product of this.products) {
      this.grandTotal = - this.productService.getCurrentPrice(product);
    }
    return grandTotal
  }

  getCart() {
    this.cartService.loadUserCart()
  }

}





