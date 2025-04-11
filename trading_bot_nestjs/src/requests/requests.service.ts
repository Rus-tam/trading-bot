import { v4 as uuidv4 } from "uuid";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist/config.service";
import axios from "axios";
import { WebsocketService } from "src/websocket/websocket.service";
import { authorizedRequestMethodType, AuthorizedRequestResultType, authorizedRequestType } from "@types";

@Injectable()
export class RequestsService {
    private readonly logger = new Logger(RequestsService.name);
    private readonly apiKey: string;

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
            return new Error("Ошибка в процессе получения серверного времени");
        }
    }

    async authorizedRequest<T>(
        params: authorizedRequestType,
        method: authorizedRequestMethodType,
    ): Promise<T> {
        const ws = await this.websocketService.connect();
        const id = uuidv4();

        const request = {
            id,
            method,
            params,
        };

        ws.send(JSON.stringify(request));

        return new Promise((resolve, reject) => {
            ws.on("message", (message) => {
                try {
                    const response = JSON.parse(message.toString());
                    if (response.id === id && response.result) {
                        resolve(response.result as T);
                    } else {
                        reject(new Error("Ошибка получения данных с API"));
                    }
                } catch (error) {
                    reject(new Error("Ошибка парсинга ответа от WebSocket"));
                }
            });
        });
    }
}
