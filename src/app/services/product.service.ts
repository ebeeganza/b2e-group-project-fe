import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Categories } from '../data/categories';
import { Price } from '../data/price';
import { Product } from '../data/product';
import { Sale } from '../data/sale';
import { Shipment } from '../data/shipments';

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

    const defaultPrice = new Price(1, 5, pastDate);
    const newerPrice = new Price(2, 4, newerDate);
    const salePrice = new Sale(1, 3, pastDate, futureDate);

    const availDate = new Date();
    availDate.setDate(new Date().getDate() - 100);

    const product = new Product("Soup", false, availDate, "Yummy savory chicken noodle soup with lots of delicious hearty herbs and spices all combined in a warm, porcelain bowl.", 'https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/10/ChickenVegetableSoup2.jpg', null, [], [], [], [])

    product.category = new Categories(Math.random(),"Food")

    product.scheduledPrices.push(defaultPrice);
    product.scheduledPrices.push(newerPrice);
    product.scheduledSales.push(salePrice);
    product.scheduledMAPS.push(new Price(6,3.01,pastDate));

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

  createProduct(name: string, available: Date, description: string, price: number, imageURL: string, category: Categories | null, MAP: number) {
    let product = new Product(name, false, available, description, imageURL, null, [], [], [], []);
    if (category) {
      product.category = category
    }
    product.scheduledPrices.push(new Price(Math.random(), price, available));
    product.scheduledMAPS.push(new Price(Math.random(), MAP, available));

    this.products.push(product);
    this.creatingProduct = false;
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

  deleteProduct(product: Product | null) {
    if (product)
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

  getDefaultPrice(product: Product): number {
    let defaultPrice = 0;
    const todayDate = new Date();

    let currPriceDate = product.availability // start looping through dates at the date the item is available
    for (let price of product.scheduledPrices) {
      if (price.date >= currPriceDate && price.date <= todayDate) {
        defaultPrice = price.price; // update the product's default price for the current date
      }
    }
    return defaultPrice;
  }

  getCurrentPrice(product: Product): number {
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

  getCurrentMAP(product: Product): number {
    let defaultMAP = 0;
    const todayDate = new Date();

    let currMAPDate = product.availability // start looping through MAPS at the date the item is available
    for (let MAP of product.scheduledMAPS) {
      if (MAP.date >= currMAPDate && MAP.date <= todayDate) {
        defaultMAP = MAP.price; // update the product's MAP for the current date
      }
    }
    return defaultMAP;
  }

  // returns the shipment the products are to be pulled from if purchased, returns null if product is out of stock
  getCurrentShipment(product: Product): Shipment | null {
    let oldestShipment: Shipment | null = null;
    let oldestDate: Date = new Date();
    oldestDate.setDate(new Date().getDate() + Infinity);

    // find the oldest shipment with positive quantity
    for (let shipment of product.shipments) {
      if (oldestDate > shipment.date && shipment.quantity > 0) {
        oldestShipment = shipment;
      }
    }
    return oldestShipment;
  }

  // updates the product's shipments and returns true if successful, else returns false if the product is out of stock
  attemptPurchase(product: Product) {
    let shipment = this.getCurrentShipment(product);
    if (shipment) {
      shipment.quantity--; // remove one of the products from the shipment
      if (shipment.quantity === 0 && this.getCurrentShipment(product) === null){
        product.discontinued = true; // update the product to discontinued if there are no more shipments of it
      }
      this.updateProduct(product); // update the product now that its shipment has changed
      return true;
    } else {
      // no shipment was found, so print error to user
      return false;
    }
  }

  findLossErrors(): Product[] {
    let errorProducts: Product[] = []
    for (let product of this.products) {
      let price = this.getCurrentPrice(product)
      let shipment = this.getCurrentShipment(product)
      if (shipment) {
        if (shipment.cost > price) {
          errorProducts.push(product)
        }
      } else {
        // the product is out of stock!
      }
    }
    return errorProducts;
  }

  findMAPErrors(): Product[] {
    let errorProducts: Product[] = []
    for (let product of this.products) {
      let price = this.getCurrentPrice(product)
      let MAP = this.getCurrentMAP(product)
      if (price < MAP) {
        errorProducts.push(product)
      }
    }
    return errorProducts;
  }

}
