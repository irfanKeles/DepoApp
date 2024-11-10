import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryComponent } from '../../category/category.component';
import { SharedService } from '../../../@service/shared.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Warehouse, WarehouseRequest } from '../../../@model/inventory';
import { DialogModule } from 'primeng/dialog';
import { WarehouseType } from '../../../@model/enums/WarehouseTypeEnum';

@Component({
  selector: 'app-table-creat-modal',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    CategoryComponent,
    DialogModule
  ],
  templateUrl: './table-creat-modal.component.html',
  styleUrl: './table-creat-modal.component.scss'
})
export class TableCreatModalComponent {
  getData: any;
  autoSelectedWarehouse: string;
  autoSelectedWarehouseType: WarehouseType;
  warehouseData: Warehouse[] = [];
  lastRayon?: string;
  wareHouseRequest: WarehouseRequest = new WarehouseRequest()
  public ref: DynamicDialogRef;
  constructor(
    private sharedService: SharedService,
    private dialogConfig: DynamicDialogConfig,
    public dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.getData = this.dialogConfig.data;
    this.autoSelectedWarehouse = this.sharedService.enumType(this.getData.warehouseType);
    this.autoSelectedWarehouseType = this.getData.warehouseType;
    this.getInventory();
  }

  getInventory() {
    const warehouseType = this.autoSelectedWarehouseType;
    const getWarehouse = warehouseType === 1 ? this.sharedService.warehouseA$ : this.sharedService.warehouseB$;
    getWarehouse.subscribe(x => {
      this.warehouseData = x;
      this.updateLastRayon();
    });
  }

  private updateLastRayon() {
    this.lastRayon = this.warehouseData.at(-1)?.rayon;
    if (this.lastRayon) {
      const rayonNumber = parseInt(this.lastRayon.slice(1), 10);
      this.lastRayon = "R" + (rayonNumber + 1);
      this.wareHouseRequest.rayon = this.lastRayon;
    }
  }

  closeDialog() {
    this.ref?.close()
  }

  submitForm() {
    const warehouseType = this.autoSelectedWarehouseType;
    this.warehouseData.push(this.wareHouseRequest)
    warehouseType === 1 ? this.sharedService.setInventoryA(this.warehouseData) : this.sharedService.setInventoryB(this.warehouseData);
    warehouseType === 1 ? this.sharedService.getInventoryA() : this.sharedService.getInventoryB();
    this.closeDialog()
  }
  getCategory(event: any) {
    this.wareHouseRequest.categoryId = event;
  }
}
