import { Component, Input, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Colum } from '../../@model/genericTable/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableCreatModalComponent } from './table-creat-modal/table-creat-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WarehouseType } from '../../@model/enums/WarehouseTypeEnum';
import { Warehouse } from '../../@model/inventory';
import { TableCreatProducModalComponent } from './table-creat-produc-modal/table-creat-produc-modal.component';
import { SharedService } from '../../@service/shared.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../@service/notification.service';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    TableCreatModalComponent,
    ConfirmPopupModule
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
  providers: [DialogService, ConfirmationService]
})
export class GenericTableComponent {
  @Input() cols: Colum[];
  @Input() tableData!: any[];
  @Input() warehouseType!: WarehouseType;
  @ViewChild(ConfirmPopup, { static: false }) confirmPopup!: ConfirmPopup;
  public ref: DynamicDialogRef;
  autoSelectedWarehouseType: WarehouseType;
  warehouseData: Warehouse[] = [];


  constructor(
    public dialogService: DialogService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService
  ) {
  }
  ngOnInit() {
    this.autoSelectedWarehouseType = this.warehouseType;
    this.getInventory();
  }

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
  showProduct(product: Warehouse) {
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
  getInventory() {
    const warehouseType = this.autoSelectedWarehouseType;
    const getWarehouse = warehouseType === 1 ? this.sharedService.warehouseA$ : this.sharedService.warehouseB$;
    getWarehouse.subscribe(x => {
      this.warehouseData = x;
    });
  }
  deleteRayon(rowData: Warehouse, event: Event) {
    const index = this.warehouseData.findIndex(item => item.id === rowData.id);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `${rowData.rayon} Silmek Üzeresiniz ?`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        if (index !== -1) {
          this.warehouseData.splice(index, 1);
          if (this.warehouseType === 1) {
            this.sharedService.setInventoryA(this.warehouseData);
          } else {
            this.sharedService.setInventoryB(this.warehouseData);
          }
        }
        this.notificationService.success();
      },
      reject: () => {
      }
    });

  }

}
