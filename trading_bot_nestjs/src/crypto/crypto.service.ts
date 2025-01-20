import { Injectable } from "@nestjs/common";
import * as crypto from "node:crypto";
import { IAccountStatusParams } from "@types";

@Injectable()
export class CryptoService {
    accountInformation(params: IAccountStatusParams): string {
        const paramsToSign = `apiKey=${params.apiKey}&timestamp=${params.timestamp}`;
        const hmac = crypto.createHmac("sha256", params.secretKey);
        hmac.update(paramsToSign);
        const signature = hmac.digest("hex");

        return signature;
    }
}
