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
 cartProductList: any[]=[]

 public userCart: Cart[] = []
 
 private cartSubject: Subject<Cart[]> = new Subject()

  constructor(private http: HttpClient, public accountService: AccountService,private productService : ProductService, private snackBar: MatSnackBar,) { 
    this.http = http
  
  }

  //get the product
  getProducts() {
    return this.productList.asObservable();
  }

  //get Carts
  getUserCart() {
    return this.userCart
  }
  CartSubject(): Observable<Cart[]> {
    return this.cartSubject.asObservable()
  }

  loadCart(): void {
    if (this.accountService.currentUser.value.role == 1) {
      this.loadUserCart()
    }
  }

    loadUserCart(): void {
      this.http.get<Cart[]>(`http://localhost:8080/cart=${this.accountService.currentUser.value.id}`)
        .pipe(take(1))
        .subscribe({
          next: cart => {
            this.userCart = cart
            this.getUserCart()
            this.cartSubject.next(this.userCart)
            },
          error: () => {
            this.showError('Oops, something went wrong')
          }
        })
    }

    addProductToCart( products: Product[]) {
      let queryParams = new HttpParams()
      queryParams = queryParams.append("role", this.accountService.currentUser.value.role)
      this.http.post(`http://localhost:8080/cart`, {
        products
      } , { params: queryParams })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.getUserCart()
        },
        error: () => {
          this.showError('Failed to add product')
        }
      })
    }


  updateCart(cart: Cart) {
    this.http.put(`http://localhost:8080/cart`, cart)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.getUserCart();
        },
        error: (error) => {
          this.getUserCart();
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

  //adding product to chart
  addToCart(product: any){
    this.cartProductList.push(product)
    this.productList.next(this.cartProductList)
    this.getTotalPrice();
    console.log(this.cartProductList)
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartProductList.map((a:any) => {
      grandTotal += this.productService.getCurrentPrice(a);
      })
      return grandTotal;
    }

  removeCartProduct(product: any){
    const index = this.cartProductList.indexOf(product);
    this.cartProductList.splice(index,1)
    this.productList.next(this.cartProductList)
  }
  
  //clear Cart if want
  removeAllCart(){ 
    this.cartProductList = [];
    this.productList.next(this.cartProductList);
  }

  checkout(){
    
  }

//catch error message
  public showError(message: string): void {
    this.snackBar.open(message, undefined, {duration: 10000})
  }

  }




