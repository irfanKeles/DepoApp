import { Component } from '@angular/core';
import { BlankComponent } from '../blank/blank.component';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { Colum } from '../../@model/genericTable/table';
import { CategoryComponent } from '../category/category.component';

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
  tableData: any[] = [];
  constructor() {
    this.depoAColums = [
      {
        field: 'rayon', header: 'Reyon',
      },
      {
        field: 'type', header: 'Tür',
      },
      {
        field: 'products', header: 'Ürünler',
      },
    ];
    this.depoBColums = [...this.depoAColums];
    this.tableData = [
      { rayon: 'R1', type: 'Gıda', products: [{ id: 0, value: 'a' }, { id: 1, value: 'b' }] },
      { rayon: 'R2', type: 'Temizlik', products: [{ id: 0, value: 'a' }, { id: 1, value: 'b' },{ id: 2, value: 'c' }] },
      { rayon: 'R3', type: 'Kırtasiye', products: [{ id: 0, value: 'a' }]},
      { rayon: 'R4', type: 'Gıda', products:  [{ id: 0, value: 'a' }, { id: 1, value: 'b' }] },
      { rayon: 'R5', type: 'test', products: [{ id: 2, value: 'c' }]  },
      { rayon: 'R6', type: 'Test1', products: [{ id: 0, value: 'a' }, { id: 1, value: 'b' },{ id: 2, value: 'c' }]  },
    ]
  }

  ngOnInit() {

  }
}
