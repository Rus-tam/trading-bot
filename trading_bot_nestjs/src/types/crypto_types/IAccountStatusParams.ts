export interface IAccountStatusParams {
    apiKey: string;
    secretKey?: string;
    timestamp: number;
    signature?: string;
    omitZeroBalances?: boolean;
    recvWindow?: number;
}
