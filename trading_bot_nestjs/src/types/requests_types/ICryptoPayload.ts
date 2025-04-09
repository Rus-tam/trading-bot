export interface ICryptoPayload {
    apiKey: string;
    secretKey: string;
    timestamp: number;
    limit?: number;
    symbol?: string;
}
