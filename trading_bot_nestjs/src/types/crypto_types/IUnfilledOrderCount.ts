export interface IUnfilledOrderCount {
    apiKey: string;
    secretKey?: string;
    timestamp: number;
    signature?: string;
    omitZeroBalances?: boolean;
    recvWindow?: number;
}
