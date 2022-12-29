import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  public displayLogin: boolean = false

  constructor(private http: HttpClient) { }

  tryLogin(email: any, password: any) {
    this.http.get<User>('http://localhost:8080/user',email)
    .pipe(take(1))
    .subscribe()
  }


  public changeToLogin(){
    this.displayLogin = true
  }


}
