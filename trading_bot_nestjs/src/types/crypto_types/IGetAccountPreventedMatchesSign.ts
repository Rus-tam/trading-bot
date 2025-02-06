export interface IGetAccountPreventedMatchesSign {
    symbol: string;
    orderId?: number;
    limit: number;
    apiKey: string;
    signature?: string;
    timestamp: number;
    secretKey?: string;
}
