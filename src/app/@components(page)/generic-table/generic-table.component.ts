import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Colum } from '../../@model/genericTable/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent {
  @Input() cols: Colum[];
  @Input() tableData!:any[];

}
