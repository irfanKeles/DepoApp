import { Component, NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Category } from '../../@model/category';
import { CategoryService } from '../../@service/category.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  selectedCatefory: Category;
  cateGoryList: Category[] = [];

  constructor(
    private categoryService: CategoryService,
  ) { }
  ngOnInit() {
    this.getCagetory();
  }
  getCagetory() {
    this.categoryService.getList().subscribe(x => {
      this.cateGoryList = x;
    },
      err => {
        console.log(err);
      })
  }


}
