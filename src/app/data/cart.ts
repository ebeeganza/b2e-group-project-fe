import { Product } from "./product";

export class Cart {
    constructor(
        public id: number | null,
        public UserId: number,
        public products: Product[]
    ) {}
}