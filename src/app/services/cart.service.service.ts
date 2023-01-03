import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
 private showCart = false;
 private showToolbar = true;

 productList = new BehaviorSubject<any>([]);
 cartItemList: any=[]

  constructor(private http: HttpClient) { }

  public openToolbar():boolean {
    return this.showToolbar
  }

  public openCart(): boolean{
    return this.showCart;
  }

  public resetDisplay() {
    this.showCart = false
    this.showToolbar = false
  }


  public viewToolbar():void{
    this.showToolbar = true;
    this.showCart = false;
  }
  public viewCart(): void {
    this.showToolbar = false;
    this.showCart = true;
  }

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
      grandTotal += a.total;
      })
      return grandTotal;
    }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=> {
      if(product.id === a.id)
        this.cartItemList.splice(index,1)
    })
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




