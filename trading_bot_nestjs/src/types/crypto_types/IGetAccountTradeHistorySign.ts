export interface IGetAccountTradeHistorySign {
    symbol: string;
    startTime?: number;
    endTime?: number;
    apiKey: string;
    signature?: string;
    timestamp: number;
    secretKey?: string;
}
