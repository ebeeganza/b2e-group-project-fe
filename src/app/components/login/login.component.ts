import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide: boolean = true
  public email: string = ''
  public password: string = ''

  constructor(public accountService: AccountService) { }

  loginUser() {
      this.accountService.tryLogin(this.email, this.password)
  }
}
