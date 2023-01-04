import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  
  constructor(public accountService: AccountService){
    this.accountSub = this.accountService.whenAccountUpdated()
    .subscribe(accounts => this.dataSource.data = accounts)
  }

  ngOnInit(): void {}

  // Table stuff
  displayedColumns: string[] = ['action','id', 'password', 'email', 'fname', 'lname'];
  public dataSource = new MatTableDataSource<User>()
  private accountSub: Subscription


  getData() {
    this.accountService.updateAccount()
    this.dataSource.data = this.accountService.account
    }

 }

