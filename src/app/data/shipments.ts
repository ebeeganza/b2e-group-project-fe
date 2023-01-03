export class Shipment {
    public id: number | null = null
    public productId: number
    public quantity: number
    public cost: number
    public date: Date

    constructor(id: number, productId: number, quantity: number, cost: number, date: Date) {
        this.id = id,
        this.productId = productId,
        this.quantity = quantity,
        this.cost = cost
        this.date = date
    }

}