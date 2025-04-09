import { Controller, Get, Logger } from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { IAccountStatusRequest, IAccountStatusResult, ICryptoPayload } from "@types";
import { ConfigService } from "@nestjs/config";
import { CryptoService } from "src/crypto/crypto.service";

@Controller("requests")
export class RequestsController {
    private readonly apiKey: string;
    private readonly secretKey: string;
    private readonly logger = new Logger(RequestsController.name);
    constructor(
        private readonly requestsService: RequestsService,
        private readonly cryptoService: CryptoService,
        private readonly configService: ConfigService,
    ) {
        // this.apiKey = this.configService.getOrThrow("API_KEY_TEST");
        // this.secretKey = this.configService.getOrThrow("SECRET_KEY_TEST");
        this.apiKey = this.configService.getOrThrow("API_KEY");
        this.secretKey = this.configService.getOrThrow("SECRET_KEY");
    }

    @Get("/server-time")
    async getServerTime() {
        const serverTime = await this.requestsService.getServerTime();
        return serverTime;
    }

    @Get("/account-status")
    async getAccountStatus(): Promise<IAccountStatusResult> {
        const serverTime = await this.requestsService.getServerTime();
        const payload: ICryptoPayload = {
            apiKey: this.apiKey,
            secretKey: this.secretKey,
            timestamp: serverTime,
        };

        const signature = this.cryptoService.accountStatus(payload);
        const params: IAccountStatusRequest = {
            apiKey: this.apiKey,
            signature,
            timestamp: serverTime,
        };
        const accountStatus = await this.requestsService.authorizedRequest(params, "account.status");

        return accountStatus;
    }

    @Get("/order-history")
    async getOrderHistory() {
        const serverTime = await this.requestsService.getServerTime();
        const payload: ICryptoPayload = {
            apiKey: this.apiKey,
            secretKey: this.secretKey,
            timestamp: serverTime,
            // limit
            // symbol
        };
    }
}
