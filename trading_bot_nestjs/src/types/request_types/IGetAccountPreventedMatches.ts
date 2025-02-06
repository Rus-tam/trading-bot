export interface IGetAccountPreventedMatches {
    symbol: string;
    orderId?: number;
    limit: number;
    apiKey: string;
    signature?: string;
    timestamp: number;
}
