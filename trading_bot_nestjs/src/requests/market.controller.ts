import { Body, Controller, Get, Logger } from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { CryptoService } from "src/crypto/crypto.service";
import { ConfigService } from "@nestjs/config";
import { KlinesDTO } from "./dto";
import { IKlineRequest } from "@types";

@Controller("requests/market")
export class MarketController {
    private readonly apiKey: string;
    private readonly secretKey: string;
    private readonly logger = new Logger(MarketController.name);
    constructor(
        private readonly requestsService: RequestsService,
        private readonly cryptoService: CryptoService,
        private readonly configService: ConfigService,
    ) {
        this.apiKey = this.configService.getOrThrow("API_KEY_TEST");
        this.secretKey = this.configService.getOrThrow("SECRET_KEY_TEST");
        // this.apiKey = this.configService.getOrThrow("API_KEY");
        // this.secretKey = this.configService.getOrThrow("SECRET_KEY");
    }

    // Метод нужен для получения средней цены токена для тестирования метода, который будет размещать ордер
    @Get("klines")
    async getKlines(@Body() dto: KlinesDTO) {
        if (dto.limit < 500 || dto.limit > 1000) {
            throw new Error("Параметр 'limit' должен быть в пределах от 500 до 1000");
        }

        const params: IKlineRequest = {
            symbol: dto.symbol,
            interval: dto.interval,
            limit: dto.limit,
        };

        const klines = await this.requestsService.simpleRequest(params, "klines");

        return klines;
    }
}
