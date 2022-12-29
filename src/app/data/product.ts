import { Categories } from "./categories";
import { Price } from "./price";
import { Shipment } from "./shipments";

export class Product {
    public id : number | null = null;
    public name: string
    public price: number
    public discontinued: boolean
    public availability: Date
    public description: string
    public images: string[]
    public categories: Categories[]
    public schedulesMAPS: Price[]
    public scheduledPrices: Price[]
    public scheduledSales: Price[]
    public shipments: Shipment[]

    constructor(name: string, price: number, discontinued: boolean, availability: Date, description: string, images: string[], categories: Categories[], scheduledMAPS: Price[], scheduledPrices[]: Price[], scheduledSales[]: Price[], shipments: Shipment[]){
        this.name = name
        this.price = price
        this.discontinued = discontinued
        this.availability = availability
        this.description = description
        this.images = images
        this.categories = categories
        this.schedulesMAPS = scheduledMAPS
        this.scheduledPrices = scheduledPrices
        this.scheduledSales = scheduledSales
        this.shipments = shipments
    }
}