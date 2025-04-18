export interface IGetAccountOrderHistoryResult {
    symbol: string;
    orderId: number;
    orderListId: number;
    clientOrderId: string;
    price: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: string;
    timeInForce: string;
    type: string;
    side: string;
    stopPrice: string;
    icebergQty: string;
    time: number;
    updateTime: number;
    isWorking: boolean;
    workingTime: string;
    origQuoteOrderQty: string;
    selfTradePreventionMode: string;
    preventedMatchId?: number;
    preventedQuantity: string;
}
