import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Colum } from '../../@model/genericTable/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableCreatModalComponent } from './table-creat-modal/table-creat-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WarehouseType } from '../../@model/enums/WarehouseTypeEnum';
import { Warehouse } from '../../@model/inventory';
import { TableCreatProducModalComponent } from './table-creat-produc-modal/table-creat-produc-modal.component';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    TableCreatModalComponent,
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
  providers: [DialogService]
})
export class GenericTableComponent {
  @Input() cols: Colum[];
  @Input() tableData!: any[];
  @Input() warehouseType!: WarehouseType;

  public ref: DynamicDialogRef ;

  constructor(
    public dialogService: DialogService,
  ) { }

  showDialog() {
    this.ref = this.dialogService.open(TableCreatModalComponent, {
      modal: true,
      header: 'Reyon Ekle',
      data: {
        warehouseType: this.warehouseType
      },
      footer: ""
    });
  }
  showProduct(product:Warehouse){
    this.ref = this.dialogService.open(TableCreatProducModalComponent, {
      modal: true,
      header: 'Ürün Ekle',
      data: {
        product: product,
        warehouseType: this.warehouseType
      },
      footer: ""
    });
  }

}
