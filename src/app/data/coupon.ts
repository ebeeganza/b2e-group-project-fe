export class Coupon {
    constructor(
        public id: number,
        public code: string,
        public Discount: number,
        public StartDate: Date,
        public EndDate : Date,
        public orderTotalMin: number,
    ) {}
}