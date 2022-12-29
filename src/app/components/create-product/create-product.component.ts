import { Component } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  public name = ''
  public price: number | null = null
  public available: Date | null = null
  public description = ''

  createProduct(name: string, price: number | null, available: Date | null, description: string){
    // use service to create product
  }

}
