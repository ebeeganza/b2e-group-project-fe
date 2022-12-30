import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Price } from '../data/price';
import { Product } from '../data/product';
import { Sale } from '../data/sale';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = []

  public creatingProduct = false;

  constructor(private http: HttpClient) {
    /**
     * TODO: TEST CASE TO BE DELETED LATER
     */
    
    const futureDate = new Date();
    futureDate.setDate(new Date().getDate() + 90)
    console.log(futureDate);

    const pastDate = new Date();
    pastDate.setDate(new Date().getDate() - 90)
    console.log(pastDate);

    const newerDate = new Date();
    newerDate.setDate(new Date().getDate() - 80)

    const defaultPrice = new Price(1,5,pastDate);
    const newerPrice = new Price(2,4,newerDate);
    const salePrice = new Sale(1,3,pastDate,futureDate);

    const availDate = new Date();
    availDate.setDate(new Date().getDate() - 100);

    const product = new Product("Soup", false, availDate, "Yummy savory chicken noodle soup with lots of delicious hearty herbs and spices all combined in a warm, porcelain bowl.", 'https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/10/ChickenVegetableSoup2.jpg', [], [], [], [], [])

    product.scheduledPrices.push(defaultPrice);
    product.scheduledPrices.push(newerPrice);
    product.scheduledSales.push(salePrice);

    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  updateProducts() {
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

  createProduct(name: string, available: Date, description: string, price: number, imageURL: string) {
    const defaultPrice = new Price(Math.random(), price, available);
    const product = new Product(name, false, available, description, imageURL, [], [], [], [], []);
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

  deleteProduct(product: Product) {
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

  updateProduct(product: Product) {
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

  public getDefaultPrice(product: Product): number {
    let defaultPrice = 0;
    const todayDate = new Date();

    let currPriceDate = product.availability // start looping through dates at the date the item is available
    for (let price of product.scheduledPrices) {
      if (price.date > currPriceDate && price.date <= todayDate) {
        defaultPrice = price.price; // update the product's default price for the current date
      }
    }
    return defaultPrice;
  }

  public getCurrentPrice(product: Product): number {
    let defaultPrice = this.getDefaultPrice(product);
    const todayDate = new Date();

    // if a sale is going on, return the sale price
    for (let sale of product.scheduledSales) {
      if (sale.startDate <= todayDate && sale.endDate > todayDate) {
        return sale.price
      }
    }
    return defaultPrice;
  }

}
