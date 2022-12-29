import { Component, Input } from '@angular/core';
import { Product } from 'src/app/data/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() product: Product | null = null;

  public edit = false;

  editProduct(){
    this.edit = true;
  }

  updateProduct(){
    // use service to update the product
  }
}
