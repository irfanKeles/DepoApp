import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryComponent } from '../../category/category.component';
import { InventoryTypeEnum } from '../../../@model/enums/inventoryTypeEnum';

@Component({
  selector: 'app-table-creat-modal',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CategoryComponent
  ],
  templateUrl: './table-creat-modal.component.html',
  styleUrl: './table-creat-modal.component.scss'
})
export class TableCreatModalComponent {
  @Input() type: InventoryTypeEnum;
  selectedInventory: string;
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  ngOnInit() {
    this.selectedInventory = this.enumType(this.type);
  }
  enumType(data: InventoryTypeEnum): string {
    let item: string = "";
    switch (data) {
      case 1:
        item = 'Depo A';
        break;
      case 2:
        item = 'Depo B';
        break;
    }
    return item;
  }
}
