
export class PortfolioItem {
    id: number;
    wkn: string;
    name: string;
    description: string;
    category: string;
    purchasePrice: number;
    quantity: number;
    purchaseDate: Date;
    totalQuantity: number;
    totalPrice: number;
    averagePrice: number;

    constructor(
        id: number,
        wkn: string,
        name: string,
        description: string,
        category: string,
        purchasePrice: number,
        quantity: number,
        purchaseDate: Date,
        totalQuantity: number,
        totalPrice: number,
        averagePrice: number,


    ) {
        this.id = id;
        this.wkn = wkn;
        this.name = name;
        this.description = description;
        this.category = category;
        this.purchaseDate = purchaseDate;
        this.totalQuantity = totalQuantity;
        this.quantity = quantity;
        this.purchasePrice = purchasePrice;
        this.totalPrice = totalPrice;
        this.averagePrice = averagePrice;
    }

}


