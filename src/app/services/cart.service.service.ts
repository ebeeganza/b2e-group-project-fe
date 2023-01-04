import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Cart } from '../data/cart';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

 productList = new BehaviorSubject<any>([]);
 @Input() cartProductList: any[]=[]
 
 public cartSubject: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([])

  constructor(private http: HttpClient, private productService : ProductService) { 
    this.getOnCart()
    this.http = http
  }

  //get the product
  getProducts() {
    return this.productList.asObservable();
  }

  getOnCart(): void {
    this.http.get<Cart[]>(`http://localhost:8080/cart`)
      .pipe(take(1))
      .subscribe({
        next: (carts) => this.cartSubject.next(carts),
        error: (err) => console.log("Error getting categories")
      })
  }

  public addNewCart (id: number, UserId:number, Product:[]): void{
    this.http.post(`http://localhost:8080/cart`,{
      id: null,
      UserId,
      Product,
    })
      .pipe(take(1))
      .subscribe({
          next: () => {
            console.log(id, UserId, Product)
            console.log("Successfully deleted a Product!")
          },
          error:() =>{
            console.log("Oops, something went wrong on the server side")
        }
        })
  }

  updateProduct(cart: Cart) {
    this.http.put("http://localhost:8080/products", cart)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.getOnCart();
        },
        error: (error) => {
          this.getOnCart();
        }
      })
  }
  
  deleteOnCart(id:number){
    this.http.delete(`http://localhost:8080/cart/${id}`)
    .pipe(take(1))
    .subscribe({
      next: () => {
        console.log("Successfully deleted a Product!")
      },
      error: () => {
        console.log("Oops, something went wrong on the server side")
      }
    })
  }


  setProduct(product:any){
    this.cartProductList.push(...product);
    this.productList.next(product);
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


  }




