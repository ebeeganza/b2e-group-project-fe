import { Component, Input, OnInit } from '@angular/core';
import { Categories } from 'src/app/data/categories';
import { Price } from 'src/app/data/price';
import { Product } from 'src/app/data/product';
import { Shipment } from 'src/app/data/shipments';
import { AccountService } from 'src/app/services/account.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product | null = null;

  public defaultPrice = 2.50;
  public currentPrice = 1.99;

  public todayDate = new Date();

  public name = ''
  public description = ''
  public price = 0
  public available = this.todayDate;
  public priceVal = 0;
  public dateVal = this.todayDate;
  public shipQuantity = 0;
  public shipCost = 0;
  public imageURL = ''

  public edit = false;
  public changeName = false;
  public changeDesc = false;
  public changePrice = false;
  public changeAvail = false;
  public schedMAP = false;
  public schedPrice = false;
  public schedSale = false;
  public addShip = false;
  public addIm = false;
  public addCat = false;

  constructor(private productService: ProductService, public accountService : AccountService) { }

  ngOnInit(): void {
    // update the product's default price and current price
    if(this.product){
      let currDate = this.product.availability;
      for(let price of this.product?.scheduledPrices){
        if (price.date === this.product.availability){
          this.defaultPrice = price.price;
          this.currentPrice = price.price;
        }
        if(price.date > currDate && price.date <= this.todayDate) {
          currDate = price.date
          this.currentPrice = price.price;
        }
      }
    }
  }

  ngOnChange(): void {
    // update the product's default price and current price
    if(this.product){
      let currDate = this.product.availability;
      for(let price of this.product?.scheduledPrices){
        if (price.date === this.product.availability){
          this.defaultPrice = price.price;
          this.currentPrice = price.price;
        }
        if(price.date > currDate && price.date <= this.todayDate) {
          currDate = price.date
          this.currentPrice = price.price;
        }
      }
    }
  }

  resetVals(){
    this.changeName = false;
    this.changeDesc = false;
    this.changePrice = false;
    this.changeAvail = false;
    this.schedMAP = false;
    this.schedPrice = false;
    this.schedSale = false;
    this.addShip = false;
    this.addIm = false;
    this.addCat = false;
  }

  updateName() {
    if (this.product) {
      this.product.name = this.name;
      this.changeName = false;
    }
  }

  updateDescription() {
    if (this.product) {
      this.product.description = this.description;
      this.changeDesc = false;
    }
  }

  updateAvail() {
    if (this.product) {
      this.product.availability = this.available;
      this.changeAvail = false;
    }
  }

  addCategory(category: Categories) {
    // TODO: add the category
    this.addCat = false;
  }

  addImage() {
    if(this.product)
    this.product.images.push(this.imageURL)
    this.addIm = false;
  }

  addScheduledMAP() {
    if(this.product)
    this.product.schedulesMAPS.push(new Price(Math.random(), this.priceVal, this.dateVal))
    this.schedMAP = false;
    this.priceVal = 0;
    this.dateVal = this.todayDate;
  }

  addScheduledPrice() {
    if(this.product)
    this.product.scheduledPrices.push(new Price(Math.random(), this.priceVal, this.dateVal));
    this.schedPrice = false;
    this.priceVal = 0;
    this.dateVal = this.todayDate;
  }

  addScheduledSale() {
    if(this.product)
    this.product.scheduledSales.push(new Price(Math.random(), this.priceVal, this.dateVal));
    this.schedSale = false;
    this.priceVal = 0;
    this.dateVal = this.todayDate;
  }

  addShipment() {
    if (this.product) {
      if (this.product.id)
        this.product.shipments.push(new Shipment(Math.random(), this.product.id, this.shipQuantity, this.shipCost));
    }
    this.addShip = false;
  }

  // save the modified product to the backend
  saveProduct() {
    if (this.product) {
      this.productService.updateProduct(this.product);
      this.edit = false;
    }
  }

}
