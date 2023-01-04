import { Component, Input } from '@angular/core';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  
  @Input() account: User

  public id: number
  public fname: string
  public lname: string 
  public email: string
  public password: string 
  public role: number 
  
  private accountService: AccountService

  constructor(accountService: AccountService) {
    this.accountService = accountService
    this.account = this.accountService.currentUser.getValue()
    this.id = this.accountService.currentUser.value.id
    this.fname = this.accountService.currentUser.value.fname
    this.lname = this.accountService.currentUser.value.lname
    this.email = this.accountService.currentUser.value.email
    this.password = this.accountService.currentUser.value.password
    this.role = this.accountService.currentUser.value.role
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
    this.accountService.updateEditedAccount(
      {
        ...this.account
      }
    )
  }

  // TODO: Add cancel logic
  onCancel(): void {
    this.accountService.displayEdit = false
  }
}
