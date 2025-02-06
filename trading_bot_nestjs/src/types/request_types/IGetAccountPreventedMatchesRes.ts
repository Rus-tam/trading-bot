export interface IGetAccountPreventedMatchesRes {
    symbol: string;
    preventedMatchId: number;
    takerOrderId: number;
    makerSymbol: string;
    makerOrderId: number;
    tradeGroupId: number;
    selfTradePreventionMode: string;
    price: string;
    makerPreventedQuantity: string;
    transactTime: number;
}
