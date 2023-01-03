import { Component } from '@angular/core';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  public account: User = new User(-1, '', '', 'Guest', '', -1)
  private accountService: AccountService

  constructor(accountService: AccountService) {
    this.accountService = accountService
  }

  ngOnInit(): void {
  }

  updateFirstName(fname: string): void {
    this.account.fname = fname
  }

  updateLastName(lname: string): void {
    this.account.lname = lname
  }

  // updateTime(time: string): void {
  //   this.appointment.time = time
  // }

  updateEmail(email: string): void {
    this.account.email = email
  }

  updatePassword(password: string): void {
    this.account.password = password
  }

  updateRole(role: number): void {
    this.account.role = role
  }

  onApply(): void {
    // {} - create a new object
    // ... - deconstruct the following thing
    this.accountService.addAccount(
      {
        ...this.account
      }
    )
  }

  // TODO: Add cancel logic
  onCancel(): void {
    console.log('cancel')
  }
}
