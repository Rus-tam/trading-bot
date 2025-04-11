import { Body, Controller, Get, Logger } from "@nestjs/common";
import { RequestsService } from "./requests.service";
import {
    IAccountStatusRequest,
    IAccountStatusResult,
    ICryptoPayload,
    IOrderHistoryRequest,
    IOrderHistoryResult,
} from "@types";
import { ConfigService } from "@nestjs/config";
import { CryptoService } from "src/crypto/crypto.service";
import { OrderHistoryDTO } from "./dto";

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
        const accountStatus = await this.requestsService.authorizedRequest<IAccountStatusResult>(
            params,
            "account.status",
        );

        const availableCoins = [];

        for (let i = 0; i < accountStatus.balances.length; i++) {
            if (parseFloat(accountStatus.balances[i].free) !== 0) {
                availableCoins.push(accountStatus.balances[i]);
            }
        }

        accountStatus.balances = [...availableCoins];

        return accountStatus;
    }

    @Get("/order-history")
    async getOrderHistory(@Body() dto: OrderHistoryDTO): Promise<IOrderHistoryResult> {
        const serverTime = await this.requestsService.getServerTime();
        if (dto.limit < 500 || dto.limit > 1000) {
            throw new Error("Параметр 'limit' должен быть в пределах от 500 до 1000");
        }
        const payload: ICryptoPayload = {
            apiKey: this.apiKey,
            secretKey: this.secretKey,
            timestamp: serverTime,
            limit: dto.limit,
            symbol: dto.symbol,
        };

        const signature = this.cryptoService.getOrderHistory(payload);
        const params: IOrderHistoryRequest = {
            apiKey: this.apiKey,
            signature,
            timestamp: serverTime,
            limit: dto.limit,
            symbol: dto.symbol,
        };

        const orderHistory = await this.requestsService.authorizedRequest<IOrderHistoryResult>(
            params,
            "allOrders",
        );

        return orderHistory;
    }
}
