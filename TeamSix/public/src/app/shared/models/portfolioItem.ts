
export class PortfolioItem {
    id: number;
    isin: string;
    name: string;
    description: string;
    type: string;
    price: number;
    purchasePrice: number;
    quantity: number;
    purchaseDate: Date;
    totalQuantity: number;
    totalPrice: number;
    averagePrice: number;
    profitLossSum: number;
    isFavorite: boolean;
    plusButton: string;

    constructor(
        id: number,
        isin: string,
        name: string,
        description: string,
        type: string,
        price: number,
        purchasePrice: number,
        quantity: number,
        purchaseDate: Date,
        totalQuantity: number,
        totalPrice: number,
        averagePrice: number,
        profitLossSum: number,
        isFavorite: boolean,
        plusButton: string,

    ) {
        this.id = id;
        this.isin = isin;
        this.name = name;
        this.description = description;
        this.type = type;
        this.price = price;
        this.purchaseDate = purchaseDate;
        this.totalQuantity = totalQuantity;
        this.quantity = quantity;
        this.purchasePrice = purchasePrice;
        this.totalPrice = totalPrice;
        this.averagePrice = averagePrice;
        this.profitLossSum = profitLossSum;
        this.isFavorite = isFavorite;
        this.plusButton = plusButton;
    }

}


