import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Product } from '../data/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products : Product[] = []

  constructor(private http: HttpClient) { }

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

  createProduct(name: string, price: number, available: Date, description: string){
    const product = new Product(name,price,false,available,description,[],[],[],[],[],[]);
    this.http.put("localhost:8080/products", product)
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.updateProducts();
      },
      error: (error) => {
        //TODO: print error message
      }
    })
  }


}
