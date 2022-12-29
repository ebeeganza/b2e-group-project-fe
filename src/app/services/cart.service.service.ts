import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
 private showCart = false;
 private showToolbar = true;

  constructor() { }

  public openToolbar():boolean {
    return this.showToolbar
  }
  public openCart (): boolean {
    return this.showCart
  }

  public viewToolbar():void{
    this.showToolbar = true;
    this.showCart = false;
  }

  public viewCart(): void {
    this.showToolbar = false;
    this.showCart = true;
  }

}
