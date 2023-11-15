export class PortfolioDetailDTO {
  id: number;
  name: string;
  description: string;
  category: string;
  purchases: PurchaseDTO[];

  constructor(
    id: number,
    name: string,
    description: string,
    category: string,
    purchases: PurchaseDTO[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.purchases = purchases;
  }
}

export class PurchaseDTO {
  wkn: string;
  purchaseDate: Date;
  quantity: number;
  totalQuantity: number;
  purchasePrice: number;
  totalPrice: number;
  averagePrice: number;

  constructor(
    wkn: string,
    purchaseDate: Date,
    quantity: number,
    totalQuantity: number,
    purchasePrice: number,
    totalPrice: number,
    averagePrice: number

  ) {
    this.wkn = wkn;
    this.purchaseDate = purchaseDate;
    this.totalQuantity = totalQuantity;
    this.quantity = quantity;
    this.purchasePrice = purchasePrice;
    this.totalPrice = totalPrice;
    this.averagePrice = averagePrice;
  }
}
