import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SharedService } from '../../../@service/shared.service';
import { WarehouseType } from '../../../@model/enums/WarehouseTypeEnum';
import { Warehouse } from '../../../@model/inventory';
import { Product } from '../../../@model/product';

@Component({
  selector: 'app-table-creat-produc-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule
  ],
  templateUrl: './table-creat-produc-modal.component.html',
  styleUrl: './table-creat-produc-modal.component.scss'
})
export class TableCreatProducModalComponent {
  myForm: FormGroup;
  autoSelectedWarehouseType: WarehouseType;
  isDisabled: boolean = true;
  warehouseData: Warehouse[] = [];
  product:Product = new Product();
  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private sharedService:SharedService,
  ) {

  }
  ngOnInit() {
    this.autoSelectedWarehouseType = this.dialogConfig.data.warehouseType;
    this.myForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      rayon: [{ value: `${this.dialogConfig.data.product.rayon}`, disabled: this.isDisabled }, Validators.required],
    });
    this.getInventory();
  }
  onSubmit(form: FormGroup) {
    if(form.valid){
      this.product = form.value;
      this.createdProduct();
      form.reset();
    }

  }
  getInventory() {
    const warehouseType = this.autoSelectedWarehouseType;
    const getWarehouse = warehouseType === 1 ? this.sharedService.warehouseA$ : this.sharedService.warehouseB$;
    getWarehouse.subscribe(x => {
      this.warehouseData = x;
    });
  }
  createdProduct() {
    const warehouseType = this.autoSelectedWarehouseType;
    this.warehouseData.forEach((val, index) => {
      if(this.dialogConfig.data.product.rayon === val.rayon){
        if (val.products) {
          val.products.push(this.product);
        } else {
          val.products = [this.product]; 
        }
      }
    })
    if (warehouseType === 1) {
      this.sharedService.setInventoryA(this.warehouseData);
    } else {
      this.sharedService.setInventoryB(this.warehouseData);
    }
  }
  

}
