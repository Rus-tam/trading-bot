import { Body, Controller, Get } from "@nestjs/common";
import { RequestService } from "./request.service";
import {
    IAccountStatusResult,
    IAccountStatusParams,
    IGetServerTime,
    IUnfilledOrderCount,
    IUnfilledOrderCountFirst,
    IUnfilledOrderCountSecond,
    IGetAccountOrderHistory,
    IGetAccountOrderHistorySign,
    IGetAccountOrderHistoryResult,
    IGetAccountOrderListHistory,
    IGetAccountOrderListHistorySign,
    IAccountOrderListHistoryRes,
    IGetAccountTradeHistory,
    IGetAccountTradeHistorySign,
    IGetAccountTradeHistoryRes,
    IGetAccountPreventedMatches,
    IGetAccountPreventedMatchesSign,
    IGetAccountPreventedMatchesRes,
    OverallResult,
} from "@types";
import { CryptoService } from "src/crypto/crypto.service";
import { ConfigService } from "@nestjs/config";
import {
    AccountOrderHistoryDTO,
    AccountOrderListHistoryDTO,
    AccountPreventedMatchesDTO,
    AccountTradeHistoryDTO,
} from "@dto";

@Controller("request")
export class RequestController {
    private apiKey: string;
    private secretKey: string;
    constructor(
        private readonly requestService: RequestService,
        private readonly cryptoService: CryptoService,
        private readonly configService: ConfigService,
    ) {
        // this.apiKey = this.configService.getOrThrow("API_KEY_TEST");
        // this.secretKey = this.configService.getOrThrow("SECRET_KEY_TEST");
        this.apiKey = this.configService.getOrThrow("API_KEY");
        this.secretKey = this.configService.getOrThrow("SECRET_KEY");
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

    @Get("/account_status")
    async getAccountStatus(): Promise<IAccountStatusResult> {
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

    // @Get("/account_order_history")
    // async getAccountOrderHistory(
    //     @Body() dto: AccountOrderHistoryDTO,
    // ): Promise<IGetAccountOrderHistoryResult> {
    //     const limit = dto.limit;
    //     const symbol = dto.symbol;
    //     if (limit < 500 || limit > 1000) {
    //         throw new Error("Параметр 'limit' должен быть в пределах от 500 до 1000");
    //     }
    //     const serverTime = await this.getServerTime();

    //     const params: IGetAccountOrderHistory = {
    //         apiKey: this.apiKey,
    //         limit,
    //         symbol,
    //         timestamp: serverTime.serverTime["serverTime"],
    //     };

    //     const cryptoParams: IGetAccountOrderHistorySign = { ...params };
    //     cryptoParams["secretKey"] = this.secretKey;

    //     params["signature"] = this.cryptoService.getAccountOrderHistory(cryptoParams);
    //     const serverResponse = await this.requestService.getAccountOrderHistory(params);

    //     return serverResponse;
    // }

    // Query information about all your order lists, filtered by time range.
    @Get("/account_order_list_history")
    async getAccountOrderListHistory(
        @Body() dto: AccountOrderListHistoryDTO,
    ): Promise<IAccountOrderListHistoryRes[]> {
        const limit = dto.limit;
        if (limit < 500 || limit > 1000) {
            throw new Error("Параметр 'limit' должен быть в пределах от 500 до 1000");
        }

        const serverTime = await this.getServerTime();

        const params: IGetAccountOrderListHistory = {
            limit,
            apiKey: this.apiKey,
            timestamp: serverTime.serverTime["serverTime"],
        };

        const cryptoParams: IGetAccountOrderListHistorySign = { ...params };
        cryptoParams["secretKey"] = this.secretKey;

        params["signature"] = this.cryptoService.getAccountOrderListHistory(cryptoParams);
        const serverResponse = await this.requestService.getAccountOrderListHistory(params);

        return serverResponse;
    }

    // Query information about all your trades, filtered by time range.
    @Get("/account_trade_history")
    async getAccountTradeHistory(@Body() dto: AccountTradeHistoryDTO): Promise<IGetAccountTradeHistoryRes[]> {
        const symbol = dto.symbol;

        const serverTime = await this.getServerTime();

        const params: IGetAccountTradeHistory = {
            symbol,
            apiKey: this.apiKey,
            timestamp: serverTime.serverTime["serverTime"],
        };

        const cryptoParams: IGetAccountTradeHistorySign = { ...params };
        cryptoParams["secretKey"] = this.secretKey;

        params["signature"] = this.cryptoService.getAccountTradeHistory(cryptoParams);
        const serverResponse = await this.requestService.getAccountTradeHistory(params);

        return serverResponse;
    }

    // Displays the list of orders that were expired due to STP.
    @Get("/account_prevented_matches")
    async getAccountPreventedMatches(@Body() dto: AccountPreventedMatchesDTO): Promise<OverallResult> {
        const symbol = dto.symbol;
        const limit = dto.limit;
        const orderId = dto.orderId;
        if (limit < 500 || limit > 1000) {
            throw new Error("Параметр 'limit' должен быть в пределах от 500 до 1000");
        }
        const serverTime = await this.getServerTime();

        const params: IGetAccountPreventedMatches = {
            symbol,
            limit,
            orderId,
            apiKey: this.apiKey,
            timestamp: serverTime.serverTime["serverTime"],
        };

        const cryptoParams: IGetAccountPreventedMatchesSign = { ...params };
        cryptoParams["secretKey"] = this.secretKey;

        params["signature"] = this.cryptoService.getAccountPreventedMatches(cryptoParams);
        const serverResponse = await this.requestService.getRequest(params, "myPreventedMatches");

        return serverResponse;
    }

    @Get("/playground")
    async playground(@Body() dto: AccountPreventedMatchesDTO) {
        const symbol = dto.symbol;
        const limit = dto.limit;
        const orderId = dto.orderId;
        if (limit < 500 || limit > 1000) {
            throw new Error("Параметр 'limit' должен быть в пределах от 500 до 1000");
        }
        const serverTime = await this.getServerTime();

        const params: IGetAccountPreventedMatches = {
            symbol,
            limit,
            orderId,
            apiKey: this.apiKey,
            timestamp: serverTime.serverTime["serverTime"],
        };

        const cryptoParams: IGetAccountPreventedMatchesSign = { ...params };
        cryptoParams["secretKey"] = this.secretKey;

        params["signature"] = this.cryptoService.getAccountPreventedMatches(cryptoParams);
        const serverResponse = await this.requestService.getRequest(params, "myPreventedMatches");

        return serverResponse;
    }
}
