import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { Cart } from '../data/cart';
import { Product } from '../data/product';
import { AccountService } from './account.service';
import { CouponsService } from './coupons.service';
import { ProductService } from './product.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  //productList = new BehaviorSubject<any>([]);
  cartProductList: any[] = []

  public cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(new Cart(Math.random(),-1,[]))

  constructor(private http: HttpClient, public accountService: AccountService, private productService: ProductService, private snackBar: MatSnackBar, private couponService : CouponsService) {
    this.http = http
    if(!this.accountService.isLoggedIn) {
      var cartString = localStorage.getItem("cart")
      if(cartString){
        var cart = JSON.parse(cartString)
        this.cartSubject.next(cart)
        console.log(this.cartSubject.value.products);
        
      }
    }
  }
  
  /*
  CartSubject(): Observable<Cart> {
    return this.cartSubject.asObservable()
  }
  */

  loadUserCart(): void {
    if(this.accountService.isLoggedIn && this.accountService.userIsCustomer()) {
      this.http.get<Cart>(`http://localhost:8080/cart?userId=${this.accountService.currentUser.value.id}`)
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
    
  }

  updateCart(cart: Cart) {
    console.log(cart.id)
    console.log(cart)
    if(this.accountService.isLoggedIn) {
      this.http.put("http://localhost:8080/cart", cart)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loadUserCart()
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
    
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
  addToCart(product: any) {
    /*
    this.cartProductList.push(product)
    this.productList.next(this.cartProductList)
    this.getTotalPrice();
    console.log(this.cartProductList)
    */

    let cart = this.cartSubject.value
    console.log(cart.userId);
    
    cart.products.push(product)
    this.cartSubject.next(cart)

    if (this.accountService.userIsCustomer()) {
      this.updateCart(cart)
    }
    else {
      localStorage.setItem('cart',JSON.stringify(cart))
    }

  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartSubject.value.products.map((a: any) => {
      grandTotal += this.productService.getCurrentPrice(a);
    })
    return grandTotal;
  }

  removeCartProduct(product: Product) {
    let products = this.cartSubject.value.products
    products.splice(this.cartSubject.value.products.indexOf(product), 1)
    let cart = this.cartSubject.value
    cart.products = products
    localStorage.removeItem("cart")
    localStorage.setItem("cart",JSON.stringify(cart))
    this.cartSubject.next(cart)

    // this.cartSubject.value.products.splice(this.cartSubject.value.products.indexOf(product), 1)
  }

  //clear Cart if want
  removeAllCart() {
    let cart = this.cartSubject.value
    cart.products = []
    this.cartSubject.next(cart)
    this.updateCart(cart)
    localStorage.removeItem("cart")
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




