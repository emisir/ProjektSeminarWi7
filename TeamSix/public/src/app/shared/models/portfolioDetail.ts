export interface PortfolioDetail {
    isin: string;
    name: string;
    description: string;
    type: string;
    currentPrice: number;
    totalQuantity: number;
    averagePrice: number;
    profitLossPerStock: number;
    profitLossSum: number;
    portfolioItems: PortfolioDetailItem[]
}

export interface PortfolioDetailItem {
    purchaseDate: string
    quantity: number
    purchasePrice: number
    totalPrice: number

}