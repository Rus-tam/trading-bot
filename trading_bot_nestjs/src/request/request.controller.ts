import { Controller, Get } from "@nestjs/common";
import { RequestService } from "./request.service";
import {
    IAccountStatusResult,
    IAccountStatusParams,
    IGetServerTime,
    IUnfilledOrderCount,
    IUnfilledOrderCountFirst,
    IUnfilledOrderCountSecond,
} from "@types";
import { CryptoService } from "src/crypto/crypto.service";
import { ConfigService } from "@nestjs/config";
import { sign } from "crypto";

@Controller("request")
export class RequestController {
    private apiKey: string;
    private secretKey: string;
    constructor(
        private readonly requestService: RequestService,
        private readonly cryptoService: CryptoService,
        private readonly configService: ConfigService,
    ) {
        this.apiKey = this.configService.getOrThrow("API_KEY_TEST");
        this.secretKey = this.configService.getOrThrow("SECRET_KEY_TEST");
    }

    @Get("/ping")
    async testConnection() {
        await this.requestService.testConnection();
    }

    @Get("/time")
    async getServerTime(): Promise<IGetServerTime> {
        const response = await this.requestService.timeRequest();

        return response;
    }

    @Get("/account_data")
    async getAccountData(): Promise<IAccountStatusResult> {
        const serverTime = await this.getServerTime();
        const params: IAccountStatusParams = {
            apiKey: this.apiKey,
            secretKey: this.secretKey,
            timestamp: serverTime.serverTime["serverTime"],
        };
        const signature = this.cryptoService.accountStatus(params);

        const serverResponse = await this.requestService.getAccountStatus(
            signature,
            serverTime.serverTime["serverTime"],
        );

        return serverResponse;
    }

    @Get("/unfilled_order_count")
    async getUnfilledOrderCount(): Promise<[IUnfilledOrderCountFirst, IUnfilledOrderCountSecond]> {
        const serverTime = await this.getServerTime();

        const params: IUnfilledOrderCount = {
            apiKey: this.apiKey,
            secretKey: this.secretKey,
            timestamp: serverTime.serverTime["serverTime"],
        };

        const signature = this.cryptoService.accountStatus(params);

        const serverResponse = await this.requestService.getUnfilledOrderCount(
            signature,
            serverTime.serverTime["serverTime"],
        );

        return serverResponse;
    }
}
