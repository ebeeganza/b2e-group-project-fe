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

  public edit = false;

  public categories: Categories[] = []

  public images: string[] = []

  public scheduledMAPS : Price[] = []
  public scheduledPrices : Price[] = []
  public scheduledSales : Price[] = []

  public shipments : Shipment[] = []

  constructor(private service : ProductService){}

  editProduct(){
    this.edit = true;
  }

  addCategory(category: Categories){
    this.categories.push(category);
  }

  addImage(image: string){
    this.images.push(image);
  }

  addScheduledMAP(limit: number, endDate: Date){
    this.scheduledMAPS.push(new Price(Math.random(),limit,endDate))
  }

  addScheduledPrice(price: number, endDate: Date){
    this.scheduledPrices.push(new Price(Math.random(),price,endDate));
  }

  addScheduledSale(salePrice: number, endDate: Date){
    this.scheduledSales.push(new Price(Math.random(),salePrice,endDate));
  }

  addShipment(quantity: number, cost: number){
    if(this.product){
      if(this.product.id)
      this.shipments.push(new Shipment(Math.random(),this.product.id,quantity,cost));
    }
  }

  updateProduct(){
    if(this.product){
      
      this.product.categories = this.product.categories.concat(this.categories);
      this.product.images = this.product.images.concat(this.images);
      this.product.schedulesMAPS = this.product.schedulesMAPS.concat(this.scheduledMAPS);
      this.product.scheduledPrices = this.product.scheduledPrices.concat(this.scheduledPrices);
      this.product.scheduledSales = this.product.scheduledSales.concat(this.scheduledSales);
      this.product.shipments = this.product.shipments.concat(this.shipments);

      this.service.updateProduct(this.product);
      this.edit = false;
    }
  }



}
