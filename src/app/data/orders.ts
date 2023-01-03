import { Product } from "./product";

export class Order {
    constructor(
       public id: number,
       public userId: number,
       public date: Date,
       public products: String,
       public orderTotal: number
    ) {}
}