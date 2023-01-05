import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/data/product';
import { AccountService } from 'src/app/services/account.service';
import { ProductService } from 'src/app/services/product.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  @Input() products : Product[] = []

  public errorExists = false;
  public lossProducts : Product[] = []
  public mapProducts : Product[] = []

  constructor(public productService : ProductService, public accountService : AccountService){}

  ngOnInit(){
    for(let product of this.products){
      console.log("Product " + product.name + " is being viewed.")
      let lossError = this.productService.findLossError(product)
      if(lossError)
      this.lossProducts.push(lossError);

      let mapError = this.productService.findMAPError(product)
      if(mapError)
      this.mapProducts.push(mapError);
    }
    if(this.lossProducts[0] != null || this.mapProducts[0] != null){
      this.errorExists = true;
    }
  }
}
