import { Product } from "./product";

export class Cart {
    constructor(
        public id: number,
        public UserId: number,
        public products: Product[]
    ) {}
}