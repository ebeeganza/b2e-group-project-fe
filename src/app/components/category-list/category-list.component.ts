import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Categories } from 'src/app/data/categories';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  
  public dataSource: MatTableDataSource<Categories> = new MatTableDataSource<Categories>([])

  constructor(public ui: UiService){}
}
