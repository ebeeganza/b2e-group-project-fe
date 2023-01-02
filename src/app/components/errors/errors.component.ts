import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/data/product';
import { AccountService } from 'src/app/services/account.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  public errorExists = false;
  public lossProducts : Product[] = []
  public mapProducts : Product[] = []

  constructor(public productService : ProductService){}

  ngOnInit(){
    this.lossProducts = this.productService.findLossErrors();
    this.mapProducts = this.productService.findMAPErrors();
    if(this.lossProducts[0] != null || this.mapProducts[0] != null){
      this.errorExists = true;
    }
  }


}
