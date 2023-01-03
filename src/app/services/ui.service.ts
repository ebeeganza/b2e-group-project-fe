import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Categories } from '../data/categories';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  public displayCategories: boolean = false

  public categorySubject: BehaviorSubject<Categories[]> = new BehaviorSubject<Categories[]>([])

  constructor(private http: HttpClient) {
    this.updateCategories()
   }
  // GET
  updateCategories(): void {
    this.http.get<Categories[]>('http://localhost:8080/category')
      .pipe(take(1))
      .subscribe({
        next: (categories) => this.categorySubject.next(categories),
        error: (err) => console.log("Error getting categories")
      })
  }
  // PUT
  updateCategory(updatedCategory: Categories): void {
    this.http.put(`http://localhost:8080/category/${updatedCategory.id}`, updatedCategory)
      .pipe(take(1))
      .subscribe({
        next: () => this.updateCategories(),
        error: (err) => console.log("Error updating category")
      })
  }
  // POST
  createCategory(newCategory: Categories): void {
    this.http.post('http://localhost:8080/category',newCategory) 
      .pipe(take(1))
      .subscribe({
        next: () => this.updateCategories(),
        error: (err) => console.log("Error creating category") 
      })
  }
  // DELETE
  deleteCategory(categoryId: Number): void {
    this.http.delete(`http://localhost:8080/category/${categoryId}`)
    .pipe(take(1))
    .subscribe({
      next: () => this.updateCategories(),
      error: (err) => console.log(`Error deleting category ${categoryId}`)
    })
  }

  getCategories(): Observable<Categories[]> {
    return this.categorySubject.asObservable()
  }

  changeToCategories() {
    this.resetDisplay()
    this.displayCategories = true
    }

  resetDisplay() {
    this.displayCategories = false
  }


}
