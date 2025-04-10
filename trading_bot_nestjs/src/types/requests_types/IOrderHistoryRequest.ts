export interface IOrderHistoryRequest {
    apiKey: string;
    signature: string;
    timestamp: number;
    limit: number;
    symbol: string;
}
