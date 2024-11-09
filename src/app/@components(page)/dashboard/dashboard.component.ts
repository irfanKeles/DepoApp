import { Component } from '@angular/core';
import { BlankComponent } from '../blank/blank.component';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { Colum } from '../../@model/genericTable/table';
import { CategoryComponent } from '../category/category.component';
import { InventoryTypeEnum } from '../../@model/enums/inventoryTypeEnum';
import { InventoryService } from '../../@service/inventory.service';
import { Warehouse } from '../../@model/inventory';
import { Category } from '../../@model/category';
import { CategoryService } from '../../@service/category.service';
import { SharedService } from '../../@service/shared.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BlankComponent,
    GenericTableComponent,
    CategoryComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  depoAColums: Colum[] = [];
  depoBColums: Colum[] = [];
  category:Category[]= [];
  tableAWarehouseData: Warehouse[] = [];
  tableBWarehouseData: Warehouse[] = [];
  inventoryTypeA: InventoryTypeEnum = InventoryTypeEnum.A;
  inventoryTypeB: InventoryTypeEnum = InventoryTypeEnum.B;


  constructor(
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private sharedService:SharedService,
  ) {
    this.depoAColums = [
      {
        field: 'rayon', header: 'Reyon',
      },
      {
        field: 'categoryId', header: 'Tür',
      },
      {
        field: 'products', header: 'Ürünler',
      },
    ];
    this.depoBColums = [...this.depoAColums];
  }

  ngOnInit() {
    this.getCategory();
    this.getAWarehouse();
    this.getBWarehouse();
  }

  getCategory() {
    this.categoryService.getList().subscribe(x => {
      this.category = x;
      this.sharedService.setCategory(x);
    },
      err => {
        console.log(err);
      })
  }
  getAWarehouse() {
    this.inventoryService.getAWarehouse().subscribe(x => {
      this.tableAWarehouseData = x;
      this.sharedService.setInventoryA(this.tableAWarehouseData);
      this.sharedService.getCategory().subscribe(categories => {
        this.tableAWarehouseData = this.tableAWarehouseData.map(item => {
          const category = categories.find(y => y.id === item.categoryId);
          return {
            ...item,
            categoryId: category ? category.name : "null"
          };
        });
        console.log(this.tableAWarehouseData);
      });
    },
    err => {
      console.log(err);
    });
  }
  getBWarehouse(){
    this.inventoryService.getBWarehouse().subscribe(x => {
      this.tableBWarehouseData = x;
      this.sharedService.setInventoryB(this.tableBWarehouseData )
      this.tableBWarehouseData = this.tableBWarehouseData.map(x => {
        const category = this.category.find(y => y.id === x.categoryId);
        return {
            ...x,
            categoryId: category ? category.name : "null" 
        };
    });
    },
      err => {
        console.log(err);
      })
  }
}
