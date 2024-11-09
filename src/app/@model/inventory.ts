import { Category } from "./category";
import { Product } from "./product";

export class Warehouse{
    id:string;
    rayon:string;
    category:Category[];
    product:Product[];
}