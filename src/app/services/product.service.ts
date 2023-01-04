import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Categories } from '../data/categories';
import { Price } from '../data/price';
import { Product } from '../data/product';
import { Shipment } from '../data/shipments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = []

  public creatingProduct = false;
  public filtered = false;

  constructor(private http: HttpClient) {

    /**
     * TODO: TEST CASE TO BE DELETED LATER
     */

    const futureDate = new Date();
    futureDate.setDate(new Date().getDate() + 90)

    const pastDate = new Date();
    pastDate.setDate(new Date().getDate() - 90)

    const newerDate = new Date();
    newerDate.setDate(new Date().getDate() - 80)

    const defaultPrice = new Price(1, 5, pastDate, null);
    const newerPrice = new Price(2, 4, newerDate, null);
    const salePrice = new Price(1, 3, pastDate, futureDate);

    const availDate = new Date();
    availDate.setDate(new Date().getDate() - 100);

    const product = new Product("Soup", true, availDate, "Yummy savory chicken noodle soup with lots of delicious hearty herbs and spices all combined in a warm, porcelain bowl.", 'https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/10/ChickenVegetableSoup2.jpg', null, [], [], [], [])

    product.category = new Categories(1,"Food")

    product.scheduledPrices.push(defaultPrice);
    product.scheduledPrices.push(newerPrice);
    product.scheduledSales.push(salePrice);
    product.scheduledMaps.push(new Price(6,3.01,pastDate, null));

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
    } else {
      //dummy step : delete later
      // TODO: don't allow products to be created if no categories
    }
    product.scheduledPrices.push(new Price(null, price, available, null));
    product.scheduledMaps.push(new Price(null, MAP, available, null));

    this.http.put("https://localhost:8080/products", product)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.updateProducts();
          this.creatingProduct = false;
        },
        error: (error) => {
          console.log(error)
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
      if (price.startDate >= currPriceDate && price.startDate <= todayDate) {
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
      if (sale.startDate <= todayDate && sale.endDate && sale.endDate > todayDate) {
        return sale.price
      }
    }
    return defaultPrice;
  }

  getCurrentMAP(product: Product): number {
    let defaultMAP = 0;
    const todayDate = new Date();

    let currMAPDate = product.availability // start looping through MAPS at the date the item is available
    for (let MAP of product.scheduledMaps) {
      if (MAP.startDate >= currMAPDate && MAP.startDate <= todayDate) {
        defaultMAP = MAP.price; // update the product's MAP for the current date
      }
    }
    return defaultMAP;
  }

  // returns the oldest shipment with inventory still available, or null if out of stock
  getCurrentShipment(product: Product): Shipment | null {
    let oldestShipment: Shipment | null = null;
    let oldestDate: Date = new Date();
    oldestDate.setDate(new Date().getDate() + Infinity);
    const todayDate = new Date();

    // find the oldest shipment with positive quantity
    for (let shipment of product.shipments) {
      if (oldestDate > shipment.date && shipment.quantity > 0 && shipment.date <= todayDate) {
        oldestShipment = shipment;
        product.discontinued = false
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
      product.discontinued = true;
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

  filterProducts(category : Categories){
    this.filtered = true;
    let backupProducts = this.products
    this.products = []
    for(let product of backupProducts){
      if(product.category === category){
        this.products.push(product)
      }
    }
  }

  unfilter(){
    this.filtered = false;
    this.updateProducts();
  }

}
