import { Controller, Get } from "@nestjs/common";
import { RequestService } from "./request.service";
import { IAccountStatusResult, IAccountStatusParams, IGetServerTime } from "@types";
import { CryptoService } from "src/crypto/crypto.service";
import { ConfigService } from "@nestjs/config";
import { sign } from "crypto";

@Controller("request")
export class RequestController {
    constructor(
        private readonly requestService: RequestService,
        private readonly cryptoService: CryptoService,
        private readonly configService: ConfigService,
    ) {}

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
            apiKey: this.configService.getOrThrow("API_KEY_TEST"),
            secretKey: this.configService.getOrThrow("SECRET_KEY_TEST"),
            timestamp: serverTime.serverTime["serverTime"],
        };
        const signature = this.cryptoService.accountInformation(params);

        const serverResponse = await this.requestService.getAccountStatus(
            signature,
            serverTime.serverTime["serverTime"],
        );

        return serverResponse;
    }
}
