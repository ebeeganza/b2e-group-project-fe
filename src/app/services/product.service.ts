import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Price } from '../data/price';
import { Product } from '../data/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products : Product[] = []

  public creatingProduct = false;

  constructor(private http: HttpClient) { 
    /*
    //test product
    this.products.push(new Product("Soup",false,new Date(),"Yummy savory chicken noodle soup",[],[],[],[],[],[]));
    */
    
  }

  getProducts(){
    return this.products;
  }

  updateProducts(){
    this.http.get<Product[]>("http://localhost:8080/products")
    .pipe(take(1))
    .subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {

      }
    })
  }

  createProduct(name: string, available: Date, description: string, price: number){
    const defaultPrice = new Price(Math.random(),price,available);
    const product = new Product(name,false,available,description,[],[],[],[],[],[]);
    product.scheduledPrices.push(defaultPrice);
    this.http.put("localhost:8080/products", product)
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.updateProducts();
        this.creatingProduct = false;
      },
      error: (error) => {
        //TODO: print error message
      }
    })
  }

  deleteProduct(product: Product){
    this.http.delete("http://localhost:8080/products/${product.id}")
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.updateProducts();
      },
      error: (error) => {
        // print error to user
      }
    })
  }

  updateProduct(product: Product){
    this.http.put("http://localhost:8080/products", product)
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.updateProducts();
      },
      error: (error) => {
        // print error
      }
    })
  }

}
