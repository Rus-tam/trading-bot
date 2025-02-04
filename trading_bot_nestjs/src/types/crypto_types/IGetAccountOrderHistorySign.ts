export interface IGetAccountOrderHistorySign {
    symbol: string;
    startTime?: number;
    endTime?: number;
    limit: number;
    apiKey: string;
    secretKey?: string;
    signature?: string;
    timestamp: number;
}
