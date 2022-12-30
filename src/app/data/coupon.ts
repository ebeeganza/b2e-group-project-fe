export class Coupon {
    constructor(
        public id: number,
        public couponCode: string,
        public Discount: number,
        public StartDate: Date,
        public EndDate : Date,
        public orderTotalMin: number,
    ) {}
}