import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart.service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  public products: any = [];
  public grandTotal : number = 0;

  constructor(public cart:CartServiceService) {}

  ngOnInit(): void {

  }
}
