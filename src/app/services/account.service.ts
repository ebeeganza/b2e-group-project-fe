import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, take, throwError } from 'rxjs';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public displayLogin: boolean = false
  public displayRegister: boolean = false
  public isLoggedIn: boolean = false
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User(-1,'','','Guest','',-1))

  constructor(private http: HttpClient) {
    this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
    if(this.isLoggedIn){
      var userString = localStorage.getItem("user")
      if(userString){
        var user = JSON.parse(userString)
        this.currentUser.next(user)
      }
    }
  }

  tryLogin(email: string, password: string): void {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("email", email)
    queryParams = queryParams.append("password", password)
    this.http.get<User>('http://localhost:8080/user', { params: queryParams })
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.successfulLogin(user)
        },
        error: (err) => {
          // Demo Code
          localStorage.setItem("isLoggedIn","true")
          localStorage.setItem("fname","Connor")

          console.log(err);
        }
      })

  }

  registerUser(newUser: User): void {
    this.http.post<User>('http://localhost:8080/user', newUser)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.successfulLogin(user)
        },
        error: (err) => {
          // For Demo Purposes
          this.successfulLogin(newUser)

          console.log("An error occured while registering account");
        }
      })
  }

  logoutUser() {
    localStorage.clear()
  }

  successfulLogin(user: User) {
    localStorage.setItem("isLoggedIn","true")
    localStorage.setItem("user",JSON.stringify(user))
  }

  getCurrentUser(){
    return this.currentUser.asObservable()
  }

  getCurrentUserFname() {
    return this.currentUser.value.fname
  }

  public changeToLogin() {
    this.resetDisplay()
    this.displayLogin = true
  }
  public changeToRegister() {
    this.resetDisplay()
    this.displayRegister = true
  }

  public resetDisplay() {
    this.displayRegister = false
    this.displayLogin = false
  }


}
