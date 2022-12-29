import { AfterViewInit, Component } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart.service.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements AfterViewInit{
  
  constructor(public accountService: AccountService, public cart: CartServiceService) {
  }
  
  ngAfterViewInit(): void {
    const dateElement = document.getElementById("date")
    if(dateElement){
      const date = new Date()
      dateElement.innerHTML = date.toLocaleDateString()
    }
  }
 
}
