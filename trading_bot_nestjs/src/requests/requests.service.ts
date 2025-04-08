import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist/config.service";
import axios from "axios";
import { WebsocketService } from "src/websocket/websocket.service";

@Injectable()
export class RequestsService {
    private readonly logger = new Logger(RequestsService.name);
    private apiKey: string;

    constructor(
        private readonly websocketService: WebsocketService,
        private readonly configService: ConfigService,
    ) {
        // this.apiKey = this.configService.getOrThrow("API_KEY_TEST");
        this.apiKey = this.configService.getOrThrow("API_KEY");
    }

    async getServerTime() {
        this.logger.log("Запрашиваю серверное время...");
        const serverTime = await axios.get("https://api.binance.com/api/v3/time");

        if (serverTime.data && serverTime.status === 200) {
            this.logger.log("Значение серверного времени успешно получено");
            return serverTime.data["serverTime"];
        } else {
            this.logger.error("Ошибка в процессе получения серверного времени");
        }
    }

    async getAccountStatus(signature: string) {}
}
