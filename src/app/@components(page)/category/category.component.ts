import { Component, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Category } from '../../@model/category';
import { CategoryService } from '../../@service/category.service';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
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
  body: HTMLElement | undefined;
  selectedCategory: Category;
  categoryList: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.body = document.body;
    }
  }
  ngOnInit() {
    this.getCagetory();
  }
  getCagetory() {
    this.categoryService.getList().subscribe(x => {
      this.categoryList = x;
      this.selectedCategory = this.categoryList[0];
    },
      err => {
        console.log(err);
      })
  }


}
