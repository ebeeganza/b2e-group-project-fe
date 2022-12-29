import { Component } from '@angular/core';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public hide: boolean = true
  public newUser: User = new User(-1,'','','','',-1)


  constructor(public accountService: AccountService) { }

  registerUser() {
    this.accountService.registerUser(this.newUser)
  }

}
