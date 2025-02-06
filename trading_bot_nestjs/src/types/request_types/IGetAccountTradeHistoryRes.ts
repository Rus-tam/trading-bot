export interface IGetAccountTradeHistoryRes {
    symbol: string;
    id: number;
    orderId: number;
    orderListId: number;
    price: string;
    qty: string;
    quoteQty: string;
    commission: string;
    commissionAsset: string;
    time: number;
    isBuyer: boolean;
    isMaker: boolean;
    isBestMatch: boolean;
}
