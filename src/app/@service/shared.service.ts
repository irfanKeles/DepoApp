import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Warehouse } from '../@model/inventory';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Category } from '../@model/category';
import { CustomLocalStorageKey } from '../@model/storageKeys/keys';
import { WarehouseType } from '../@model/enums/WarehouseTypeEnum';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public searchQuery$ = new ReplaySubject<string>(1);
  public warehouseA$ = new ReplaySubject<any>();
  public warehouseB$ = new ReplaySubject<any>();
  public category$ = new ReplaySubject<any>();
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  setInventoryA(data: Warehouse[]) {
    this.warehouseA$.next(data)
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem(CustomLocalStorageKey.InventoryA, JSON.stringify(data))
  }
  setInventoryB(data: Warehouse[]) {
    this.warehouseB$.next(data)
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem(CustomLocalStorageKey.InventoryB, JSON.stringify(data))
  }
  setCategory(data: Category[]) {
    this.category$.next(data)
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem(CustomLocalStorageKey.Category, JSON.stringify(data))
  }

  getInventoryA(): Observable<Warehouse[]> {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(CustomLocalStorageKey.InventoryA);
      return of(data ? JSON.parse(data) : []);
    }
    return of([]);
  }

  getInventoryB(): Observable<Warehouse[]> {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(CustomLocalStorageKey.InventoryB);
      return of(data ? JSON.parse(data) : []);
    }
    return of([]); 
  }

  getCategory(): Observable<Category[]> {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(CustomLocalStorageKey.Category);
      return of(data ? JSON.parse(data) : []);
    }
    return of([]); 
  }

  setSearchQuery(query: string) {
    this.searchQuery$.next(query); 
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
