import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public displayLogin: boolean = false

  constructor(private http: HttpClient) { }

  public changeToLogin(){
    this.displayLogin = true
  }


}
