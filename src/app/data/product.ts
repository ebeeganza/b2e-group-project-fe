import { Categories } from "./categories";
import { Price } from "./price";
import { Sale } from "./sale";
import { Shipment } from "./shipments";

export class Product {
    public id : number | null = null;
    public name: string
    public discontinued: boolean
    public availability: Date
    public description: string
    public image: string
    public categories: Categories[]
    public scheduledMAPS: Price[]
    public scheduledPrices: Price[]
    public scheduledSales: Sale[]
    public shipments: Shipment[]

    constructor(name: string, discontinued: boolean, availability: Date, description: string, image: string, categories: Categories[], scheduledMAPS: Price[], scheduledPrices: Price[], scheduledSales: Sale[], shipments: Shipment[]){
        this.name = name
        this.discontinued = discontinued
        this.availability = availability
        this.description = description
        this.image = image
        this.categories = categories
        this.scheduledMAPS = scheduledMAPS
        this.scheduledPrices = scheduledPrices
        this.scheduledSales = scheduledSales
        this.shipments = shipments
    }
}