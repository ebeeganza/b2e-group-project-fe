import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject, take, throwError } from 'rxjs';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  public account: User[] = []
  private accountSubject: Subject<User[]> = new Subject()

  public displayLogin: boolean = false
  public displayRegister: boolean = false
  public isLoggedIn: boolean = false

  constructor(private http: HttpClient) {
    this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
  }

  tryLogin(email: string, password: string) {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("email", email)
    queryParams = queryParams.append("password", password)
    this.http.get<User>('http://localhost:8080/user', { params: queryParams })
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          localStorage.setItem("isLoggedIn", "true")
          switch(user.role){
            case 0: // Customer
              localStorage.setItem("role","customer")
              break
            case 1: // Shopkeeper
              localStorage.setItem("role","shopkeeper")
              break
            case 2: // Admin
              localStorage.setItem("role","admin")
              break
            default: // Guest
              localStorage.setItem("role", "guest")
          }
        },
        error: (err) => {
          console.log(err);
        }
      })

  }

  registerUser(newUser: User) {
    this.http.post<User>('http://localhost:8080/user', newUser)
      .pipe(take(1))
      .subscribe({
        next: () => {
          localStorage.setItem("isLoggedIn", "true")
        },
        error: (err) => {
          console.log("An error occured while registering account");
        }
      })
  }

  logoutUser() {
    localStorage.clear()
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

  updateAccount(): void {
    this.http
      .get<User[]>('http://localhost:8080/user')
      .pipe(take(1))
      .subscribe(account => {
        console.log(account)
        this.account = account
        this.accountSubject.next(this.account)
      })
  }

  whenAccountUpdated(): Observable<User[]> {
    return this.accountSubject.asObservable()
  }
}
