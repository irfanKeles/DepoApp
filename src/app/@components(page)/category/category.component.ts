import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Category } from '../../@model/category';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from '../../@service/shared.service';
import { NotificationService } from '../../@service/notification.service';
import { CategoryService } from '../../@service/category.service';
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
  @Output() setDataId = new EventEmitter<string>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.body = document.body;
    }
  }
  ngOnInit() {
    this.getCategory();
  }
  getCategory() {
    this.sharedService.category$.subscribe(x => {
      this.categoryList = x;
      this.selectedCategory = this.categoryList[0];
      this.setDataId.emit(this.selectedCategory.id);
    },
      err => {
        this.notificationService.error(err.message);
      })
  }
  selectedValue(event: any) {
    this.setDataId.emit(event.value.id)
  }
}
