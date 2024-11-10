import { Product } from "./product";

export class Warehouse{
    id:string;
    rayon:string;
    products?:Product[];
    categoryId:string;
}

export class WarehouseRequest {
    id: string = `${Math.floor(Math.random() * 10000)}`;
    rayon:string;
    products?:Product[];
    categoryId:string;
}