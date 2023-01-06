import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Input, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, Subscription, take } from 'rxjs';
import { Cart } from '../data/cart';
import { Product } from '../data/product';
import { User } from '../data/user';
import { AccountService } from './account.service';
import { CouponsService } from './coupons.service';
import { ProductService } from './product.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService implements OnDestroy {

  //productList = new BehaviorSubject<any>([]);
  cartProductList: any[] = []
  currentUser: User = this.accountService.guestUser
  userSub: Subscription

  public cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(new Cart(Math.random(),-1,[]))

  constructor(private http: HttpClient, public accountService: AccountService, private productService: ProductService, private snackBar: MatSnackBar, private couponService : CouponsService) {
    this.http = http
    this.userSub = this.accountService.getCurrentUser().subscribe((user) => {this.currentUser = user; console.log("updated user", user); this.loadUserCart()})
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
  
  /*
  CartSubject(): Observable<Cart> {
    return this.cartSubject.asObservable()
  }
  */

  loadUserCart(): void {
    console.log("about to load a cart with user", this.currentUser)
    this.http.get<Cart>(`http://localhost:8080/cart?userId=${this.currentUser.id}`)
      .pipe(take(1))
      .subscribe({
        next: cart => {
          console.log(cart)
          this.cartSubject.next(cart)
        },
        error: (error) => {
          if(error.status === 404 && this.accountService.userIsCustomer()){
            let newCart = new Cart(null,this.accountService.currentUser.value.id,[])
            this.createCart(newCart)
          }
        }
      })
  }

  updateCart(cart: Cart) {
    console.log("product-list.updateCart",cart)
    this.http.put("http://localhost:8080/cart", cart)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loadUserCart()
          console.log("loaded cart from cartService.updateCart")
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  createCart(cart : Cart){
    this.http.post<Cart>("http://localhost:8080/cart", cart)
    .pipe(take(1))
    .subscribe({
      next: (cart)=> {
        this.cartSubject.next(cart)
      },
      error: (error) => {
        
      }
    })
  }

  //adding product to chart
  addToCart(product: Product) {
    /*
    this.cartProductList.push(product)
    this.productList.next(this.cartProductList)
    this.getTotalPrice();
    console.log(this.cartProductList)
    */

    let cart = this.cartSubject.value
    cart.products.push(product)

    if (this.accountService.userIsCustomer()) {
      this.updateCart(cart)
    }

  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartSubject.value.products.map((a: any) => {
      grandTotal += this.productService.getCurrentPrice(a);
    })
    return grandTotal;
  }

  removeCartProduct(product: any) {
    this.cartSubject.value.products.splice(this.cartSubject.value.products.indexOf(product), 1)
  }

  //clear Cart if want
  removeAllCart() {
    this.cartSubject.value.products = [];
  }

  checkout() {

  }

  //catch error message
  public showError(message: string): void {
    this.snackBar.open(message, undefined, { duration: 10000 })
  }

  logoutCart() {
    this.cartSubject.next(new Cart(Math.random(),-1,[]))
  }

}




