export class Shipment {
    public id: number | null = null
    public productId: number
    public quantity: number
    public cost: number

    constructor(id: number, productId: number, quantity: number, cost: number) {
        this.id = id,
        this.productId = productId,
        this.quantity = quantity,
        this.cost = cost
    }
}