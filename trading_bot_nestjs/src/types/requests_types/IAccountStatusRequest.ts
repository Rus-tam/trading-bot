export interface IAccountStatusRequest {
    apiKey: string;
    omitZeroBalances?: boolean;
    recvWindow?: number;
    signature: string;
    timestamp: number;
}
