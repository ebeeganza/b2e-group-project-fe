export class Price {
    constructor(
    public id: number,
    public price: number,
    public startDate: Date,
    public endDate: Date | null
    ) {}
}