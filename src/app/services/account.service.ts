import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError, Observable, Subject, take, throwError } from 'rxjs';
import { User } from '../data/user';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public account: User[] = []
  private accountSubject: Subject<User[]> = new Subject()
  public displayEdit: boolean = false

  public displayLogin: boolean = false
  public displayRegister: boolean = false
  public isLoggedIn: boolean = false
  public guestUser: User = new User(-1,'','','Guest','',-1)
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(this.guestUser)

  public displayProfile: boolean = false

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar, private ui : UiService) {
    this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
    if(this.isLoggedIn){
      var userString = localStorage.getItem("user")
      if(userString){
        var user = JSON.parse(userString)
        this.currentUser.next(user)
      }
    }

    // TODO: dummy data
    const user1 = new User(0, "pass", "email", "Rick", "Astley", 2)
    this.account.push(user1)
  }

    
  private showError(message: string): void {
    this._snackBar.open(message, undefined, {duration: 10000})
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
    this.isLoggedIn = false
    this.currentUser.next(this.guestUser)
  }

  successfulLogin(user: User) {
    localStorage.setItem("isLoggedIn","true")
    localStorage.setItem("user",JSON.stringify(user))
    this.isLoggedIn = true
    this.currentUser.next(user)
    this.ui.showProducts()
    this.resetDisplay()
  }

  getCurrentUser(){
    return this.currentUser.asObservable()
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

  getShowEdit() {
    this.displayEdit = true
  }

  public changeToProfile() {
    this.resetDisplay()
    this.displayProfile = true
  }

  public hideProfile() {
    this.displayProfile = false
  }

  displayAccountEdit() {
    this.getShowEdit
  }


  updateAccount(): void {
    this.http
      .get<User[]>('http://localhost:8080/user')
      .pipe(take(1))
      .subscribe({ 
        next: account => {
        console.log(account)
        this.account = account
        this.accountSubject.next(this.account)
      },
      error: () => {
        this.showError('Failed to update account')
      }
    })
  }

  whenAccountUpdated(): Observable<User[]> {
    return this.accountSubject.asObservable()
  }

  addAccount(profile: User): void {
    this.http
      .post('http://localhost:8080/user', profile)
      .pipe(take(1))
      .subscribe({
        next: () => {this.updateAccount()
        },
        error: () => {
          this.showError('Failed to add account')
        }
      })
  }

  deleteAccountById(id: number): void {
    this.http
      .delete(`http://localhost:8080/user/${id}`)
      .pipe(take(1))
      .subscribe({
        next: () => {
        this.updateAccount()
        },
        error: () => {
          this.showError('Failed to delete account')
        }
      })
  }
}
