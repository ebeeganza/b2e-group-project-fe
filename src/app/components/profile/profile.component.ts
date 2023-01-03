import { Component, Input } from '@angular/core';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @Input() account: User | undefined

  constructor(public accountService: AccountService) {}
}