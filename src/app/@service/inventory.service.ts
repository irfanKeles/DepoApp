import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service';
import { Warehouse } from '../@model/inventory';
import { Observable } from 'rxjs';

const Endpoints = {
  GetAWarehouse: 'inventoryA.json',
  GetBWarehouse: 'inventoryB.json'
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(
    private _http: GenericHttpService
  ) { }

  getAWarehouse(): Observable<Warehouse[]> {
    const fullPath = Endpoints.GetAWarehouse;
    return this._http.get<Warehouse[]>(fullPath);
  }
  getBWarehouse(): Observable<Warehouse[]> {
    const fullPath = Endpoints.GetBWarehouse;
    return this._http.get<Warehouse[]>(fullPath);
  }
}
