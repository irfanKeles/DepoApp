import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service';
import { Category } from '../@model/category';
import { Observable } from 'rxjs';

const Endpoints = {
  GetList: 'category.json'
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private _http: GenericHttpService
  ) { }

  getList(): Observable<Category[]> {
    const fullPath = Endpoints.GetList;
    return this._http.get<Category[]>(fullPath);
  }
}
