import { Injectable } from '@angular/core';
import { Warehouse } from '../@model/inventory';
import { Observable, of } from 'rxjs';
import { Category } from '../@model/category';
import { CustomLocalStorageKey} from '../@model/storageKeys/keys';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  setInventoryA(data: Warehouse[]) {
    localStorage.setItem(CustomLocalStorageKey.InventoryA, JSON.stringify(data))
  }
  setInventoryB(data: Warehouse[]) {
    localStorage.setItem(CustomLocalStorageKey.InventoryB, JSON.stringify(data))
  }
  setCategory(data:Category[]){
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
  getCategoy(): Observable<Category[]> {
    const data = localStorage.getItem(CustomLocalStorageKey.Category);
    return of(data ? JSON.parse(data) : []);
  }
}
