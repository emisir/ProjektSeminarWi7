export interface PortfolioDetail {
    wkn: string
    name: string
    description: string
    category: string
    totalQuantity: number
    averagePrice: number
    portfolioItems: PortfolioDetailItem[]
}

export interface PortfolioDetailItem {
    purchaseDate: string
    quantity: number
    purchasePrice: number
    totalPrice: number
}