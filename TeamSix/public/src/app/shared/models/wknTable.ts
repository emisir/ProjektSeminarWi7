
export interface WknTable {
    id: BigInteger;
    wkn: string;
    purchasePrice: Float32Array;
    quantity: Int16Array;
    purchaseDate: Date;
    totalQuantity: Int16Array;
    totalPrice: Float32Array;
    averagePrice: Float32Array;
}


