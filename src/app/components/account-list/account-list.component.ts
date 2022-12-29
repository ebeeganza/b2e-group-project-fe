import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  public account: User[]
  private accountSubscription: Subscription
  
  constructor(public accountService: AccountService){
    this.account = accountService.account
    const accountUpdateEvent = accountService.whenAccountUpdated()
    this.accountSubscription = accountUpdateEvent.subscribe(account => this.account = account)
  }

  ngOnInit(): void {}
}
