import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { Cart } from '../data/cart';
import { Product } from '../data/product';
import { AccountService } from './account.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  productList = new BehaviorSubject<any>([]);
  cartProductList: any[] = []


  public cartSubject: Subject<Cart> = new Subject()

  constructor(private http: HttpClient, public accountService: AccountService, private productService: ProductService, private snackBar: MatSnackBar,) {
    this.http = http

  }

  //get the product
  getProducts() {
    return this.productList.asObservable();
  }

  
  CartSubject(): Observable<Cart> {
    return this.cartSubject.asObservable()
  }

  loadCart(): void {
    if (this.accountService.currentUser.value.role == 1) {
      this.loadUserCart()
    }
  }

  loadUserCart(): void {
    this.http.get<Cart>(`http://localhost:8080/cart/${this.accountService.currentUser.value.id}`)
      .pipe(take(1))
      .subscribe({
        next: cart => {
          console.log(cart)
          this.cartSubject.next(cart)
        },
        error: (error) => {
          if(error.status === 404){
            let newCart = new Cart(null,this.accountService.currentUser.value.id,[])
            
            this.createCart(newCart)
          } else {
            this.showError('Oops, something went wrong')
          }
        }
      })
  }

  


  updateCart(cart: Cart) {
    this.http.put(`http://localhost:8080/cart`, cart)
      .pipe(take(1))
      .subscribe({
        next: () => {
        },
        error: (error) => {
        }
      })
  }

  deleteProductInCart(id: number) {
    this.http.delete(`http://localhost:8080/cart/${id}`)
      .pipe(take(1))
      .subscribe({
        next: () => {

        },
        error: () => {
          this.showError('Failed to remove product')
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
  addToCart(product: any) {
    this.cartProductList.push(product)
    this.productList.next(this.cartProductList)
    this.getTotalPrice();
    console.log(this.cartProductList)
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartProductList.map((a: any) => {
      grandTotal += this.productService.getCurrentPrice(a);
    })
    return grandTotal;
  }

  removeCartProduct(product: any) {
    const index = this.cartProductList.indexOf(product);
    this.cartProductList.splice(index, 1)
    this.productList.next(this.cartProductList)
  }

  //clear Cart if want
  removeAllCart() {
    this.cartProductList = [];
    this.productList.next(this.cartProductList);
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




