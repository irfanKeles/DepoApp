import { Injectable } from '@angular/core';
import { Warehouse } from '../@model/inventory';
import {  Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Category } from '../@model/category';
import { CustomLocalStorageKey } from '../@model/storageKeys/keys';
import { WarehouseType } from '../@model/enums/WarehouseTypeEnum';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public warehouseA$ = new ReplaySubject<any>();
  public warehouseB$ = new ReplaySubject<any>();
  public category$ = new ReplaySubject<any>();
  constructor() { }

  setInventoryA(data: Warehouse[]) {
    this.warehouseA$.next(data)
    localStorage.setItem(CustomLocalStorageKey.InventoryA, JSON.stringify(data))
  }
  setInventoryB(data: Warehouse[]) {
    this.warehouseB$.next(data)
    localStorage.setItem(CustomLocalStorageKey.InventoryB, JSON.stringify(data))
  }
  setCategory(data: Category[]) {
    this.category$.next(data)
    localStorage.setItem(CustomLocalStorageKey.Category, JSON.stringify(data))
  }



  getInventoryA(): Observable<Warehouse[]> {
    const data = localStorage.getItem(CustomLocalStorageKey.InventoryA);
    return of(data ? JSON.parse(data) : []);
  }
  getInventoryB(): Observable<Warehouse[]> {
    const data = localStorage.getItem(CustomLocalStorageKey.InventoryB);
    return of(data ? JSON.parse(data) : []);
  }
  getCategory(): Observable<Category[]> {
    const data = localStorage.getItem(CustomLocalStorageKey.Category);
    return of(data ? JSON.parse(data) : []);
  }


  enumType(data: WarehouseType): string {
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
