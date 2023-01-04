import { AfterViewInit, Component } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart.service.service';
import { AccountService } from 'src/app/services/account.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements AfterViewInit{

  constructor(public accountService: AccountService, public cart: CartServiceService, public ui: UiService) {
  }

  //adding so cart shows total number of items when added into cart
  public totalItem: number = 0;
  ngOnInit():void{
    this.cart.getProducts().subscribe(res=>{
      this.totalItem = res.length
    })
  }
  
  ngAfterViewInit(): void {
    const dateElement = document.getElementById("date")
    if(dateElement){
      const date = new Date()
      dateElement.innerHTML = date.toLocaleDateString()
    }
  }
 
}
