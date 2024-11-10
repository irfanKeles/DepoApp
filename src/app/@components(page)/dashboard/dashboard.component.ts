import { Component } from '@angular/core';
import { BlankComponent } from '../blank/blank.component';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { Colum } from '../../@model/genericTable/table';
import { InventoryService } from '../../@service/inventory.service';
import { Warehouse } from '../../@model/inventory';
import { SharedService } from '../../@service/shared.service';
import { NotificationService } from '../../@service/notification.service';
import { CategoryService } from '../../@service/category.service';
import { Category } from '../../@model/category';
import { WarehouseType } from '../../@model/enums/WarehouseTypeEnum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BlankComponent,
    GenericTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchQuery: string = '';

  tableColum: Colum[] = [];

  categoryList:Category[] = [];

  warehouseListA: Warehouse[] = [];
  warehouseListB: Warehouse[] = [];

  filteredWarehouseListA: Warehouse[] = [];
  filteredWarehouseListB: Warehouse[] = [];

  warehouseTypeA: WarehouseType = WarehouseType.A;
  warehouseTypeB: WarehouseType = WarehouseType.B;

  constructor(
    private inventoryService: InventoryService,
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private categoryService: CategoryService,
  ) {
    this.tableColum = [
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
    this.setWarehosuTableDataA()
    this.setWarehosuTableDataB()
  }

  ngOnInit() {
    this.sharedService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.search();  
    });

    this.setCagetory();
    this.getWarehosuTableDataA();
    this.getWarehosuTableDataB();
  }

  setCagetory() {
    this.categoryService.getList().subscribe(x => {
      this.sharedService.setCategory(x);
    },
      err => {
        this.notificationService.error(err.message);
      })
  }

  getWarehosuTableDataA() {
    this.sharedService.warehouseA$.subscribe(x => {
      this.warehouseListA = x
      this.sharedService.category$.subscribe(categories => {
        this.categoryList = categories;
        this.warehouseListA = this.warehouseListA.map(item => {
          const categorys = this.categoryList.find(y => y.id === item.categoryId);
          return {
            ...item,
            categoryId: categorys ? categorys.name : "null"
          };
        });
      });
      this.search();
    },
      err => {
        this.notificationService.error(err.message);
      })
  }

  getWarehosuTableDataB() {
    this.sharedService.warehouseB$.subscribe(x => {
      this.warehouseListB = x
      this.sharedService.category$.subscribe(categories => {
        this.categoryList = categories;
        this.warehouseListB = this.warehouseListB.map(item => {
          const categorys = this.categoryList.find(y => y.id === item.categoryId);
          return {
            ...item,
            categoryId: categorys ? categorys.name : "null"
          };
        });
      });
      this.search();
    },
      err => {
        this.notificationService.error(err.message);
      })
  }

  setWarehosuTableDataA() {
    this.inventoryService.getAWarehouse().subscribe(x => {
      this.sharedService.setInventoryA(x);
    },
      err => {
        this.notificationService.error(err.message);
      })
  }

  setWarehosuTableDataB() {
    this.inventoryService.getBWarehouse().subscribe(x => {
      this.sharedService.setInventoryB(x);
    },
      err => {
        this.notificationService.error(err.message);
      })
  }

  search() {
    const query = this.searchQuery.toLowerCase();
    this.filteredWarehouseListA = this.warehouseListA.filter(item => 
      item.products?.some(product => product.name.toLowerCase().includes(query)) 
    );

    this.filteredWarehouseListB = this.warehouseListB.filter(item => 
      item.products?.some(product => product.name.toLowerCase().includes(query)) 
    );
  }
}
