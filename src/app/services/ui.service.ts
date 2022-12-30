import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Categories } from '../data/categories';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  public displayCategories: boolean = false

  // TEMPORARY 
  public categoryList: Categories[] = [
    new Categories(0,'Clothing'),
    new Categories(1,'Electronics'),
    new Categories(2,'Appliances'),
    new Categories(3,'Books'),
    new Categories(4,'Particle Accelerators'),
  ]

  public categorySubject: BehaviorSubject<Categories[]> = new BehaviorSubject<Categories[]>([])

  constructor(private http: HttpClient) {
    // Temporary! Populates with static data
    this.categorySubject.next(this.categoryList)

    // Real function for populating categories
    // this.updateCategories()
   }
  // GET
  updateCategories(): void {
    this.http.get<Categories[]>('http://localhost8080/categories')
      .pipe(take(1))
      .subscribe({
        next: (categories) => this.categorySubject.next(categories),
        error: (err) => console.log("Error getting categories")
      })
  }
  // PUT
  updateCategory(updatedCategory: Categories): void {
    this.http.put('http://localhost:8080/category', updatedCategory)
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
