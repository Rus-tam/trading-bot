import { Injectable } from "@nestjs/common";
import * as crypto from "node:crypto";
import { IAccountStatusParams, IGetAccountOrderHistorySign, IUnfilledOrderCount } from "@types";

@Injectable()
export class CryptoService {
    accountStatus(params: IAccountStatusParams): string {
        const paramsToSign = `apiKey=${params.apiKey}&timestamp=${params.timestamp}`;
        const hmac = crypto.createHmac("sha256", params.secretKey);
        hmac.update(paramsToSign);
        const signature = hmac.digest("hex");

        return signature;
    }

    unfilledOrderCount(params: IUnfilledOrderCount) {
        const paramsToSign = `apiKey=${params.apiKey}&timestamp=${params.timestamp}`;
        const hmac = crypto.createHmac("sha256", params.secretKey);
        hmac.update(paramsToSign);
        const signature = hmac.digest("hex");

        return signature;
    }

    getAccountOrderHistory(params: IGetAccountOrderHistorySign) {
        const paramsToSign = `apiKey=${params.apiKey}&limit=${params.limit}&symbol=${params.symbol}&timestamp=${params.timestamp}`;
        const hmac = crypto.createHmac("sha256", params.secretKey);
        hmac.update(paramsToSign);
        const signature = hmac.digest("hex");

        return signature;
    }
}
