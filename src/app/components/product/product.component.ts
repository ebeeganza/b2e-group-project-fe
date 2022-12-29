import { Component, Input } from '@angular/core';
import { Categories } from 'src/app/data/categories';
import { Price } from 'src/app/data/price';
import { Product } from 'src/app/data/product';
import { Shipment } from 'src/app/data/shipments';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() product: Product | null = null;

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

  constructor(private service: ProductService) { }

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

  updatePrice() {
    if (this.product) {
      this.product.price = this.price;
      this.changePrice = false;
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
      this.service.updateProduct(this.product);
      this.edit = false;
    }
  }

}
