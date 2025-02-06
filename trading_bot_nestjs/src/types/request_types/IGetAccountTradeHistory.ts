export interface IGetAccountTradeHistory {
    symbol: string;
    startTime?: number;
    endTime?: number;
    apiKey: string;
    signature?: string;
    timestamp: number;
}
