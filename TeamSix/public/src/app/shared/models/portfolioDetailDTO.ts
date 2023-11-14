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
  purchasePrice: number;
  totalPrice: number;

  constructor(
    wkn: string,
    purchaseDate: Date,
    quantity: number,
    purchasePrice: number,
    totalPrice: number
  ) {
    this.wkn = wkn;
    this.purchaseDate = purchaseDate;
    this.quantity = quantity;
    this.purchasePrice = purchasePrice;
    this.totalPrice = totalPrice;
  }
}
