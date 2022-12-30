import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  public name = ''
  public price: number = 0
  public available: Date = new Date()
  public description = ''

  constructor(public service: ProductService){}

  createProduct(name: string, price: number, available: Date, description: string){
    this.service.createProduct(name, available, description, price);
  }

}
