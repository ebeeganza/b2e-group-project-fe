import { Component, Input } from '@angular/core';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @Input() account: User | undefined

  public id: number
  public fname: string
  public lname: string
  public email: string
  public password: string
  public role: number


  constructor(public accountService: AccountService, public ui: UiService) {
    this.id = this.accountService.currentUser.value.id
    this.fname = this.accountService.currentUser.value.fname
    this.lname = this.accountService.currentUser.value.lname
    this.email = this.accountService.currentUser.value.email
    this.password = this.accountService.currentUser.value.password
    this.role = this.accountService.currentUser.value.role
  }

  showValues() {
    console.log(this.fname)
  }
}
