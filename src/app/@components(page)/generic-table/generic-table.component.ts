import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Colum } from '../../@model/genericTable/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableCreatModalComponent } from './table-creat-modal/table-creat-modal.component';
import { InventoryTypeEnum } from '../../@model/enums/inventoryTypeEnum';
@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    TableCreatModalComponent],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent {
  @Input() cols: Colum[];
  @Input() tableData!: any[];
  @Input() inventoryType!:InventoryTypeEnum;

}
