export interface IGetAccountOrderListHistory {
    startTime?: number;
    endTime?: number;
    limit: number;
    apiKey: string;
    timestamp: number;
    signature?: string;
}
