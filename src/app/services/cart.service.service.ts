import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

 productList = new BehaviorSubject<any>([]);
 @Input() cartItemList: any[]=[]

  constructor(private http: HttpClient, private productService : ProductService) { }

  //get the product
  getProducts() {
    return this.productList;
  }

  setProduct(product:any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  //adding product to chart
  addToCart(product: any){
    this.cartItemList.push(product)
    this.productList.next(this.cartItemList)
    this.getTotalPrice();
    console.log(this.cartItemList)
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a:any) => {
      grandTotal += this.productService.getCurrentPrice(a);
      })
      return grandTotal;
    }

  removeCartItem(product: any){
    const index = this.cartItemList.indexOf(product);
    this.cartItemList.splice(index,1)
    this.productList.next(this.cartItemList)
  }
  
    //clear Cart if want
  removeAllCart(){ 
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  checkout(){
    
  }


  }




