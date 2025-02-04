export interface IGetAccountOrderHistory {
    symbol: string;
    startTime?: number;
    endTime?: number;
    limit: number;
    apiKey: string;
    signature?: string;
    timestamp: number;
}
