export interface IGetAccountOrderListHistorySign {
    startTime?: number;
    endTime?: number;
    limit: number;
    apiKey: string;
    timestamp: number;
    signature?: string;
    secretKey?: string;
}
