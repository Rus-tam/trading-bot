import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { rejects } from "assert";
import { resolve } from "path";
import WebSocket = require("ws");

@Injectable()
export class WebsocketService {
    private readonly logger = new Logger(WebsocketService.name);

    private ws: WebSocket;

    constructor(private readonly configService: ConfigService) {}

    private async websocket() {
        this.ws = new WebSocket(this.configService.getOrThrow("WEBSOCKET_URL"));
    }

    async connect(): Promise<unknown> {
        this.logger.log("Начинаю устанавливать соединение с сервером");
        await this.websocket();

        return new Promise((resolve, rejects) => {
            this.ws.on("open", () => {
                if (this.ws.readyState === WebSocket.OPEN) {
                    process.env.CONNECTION = "OPEN";
                }
                this.logger.log("Соединение с сервером установлено");
                resolve(this.ws);
            });

            this.ws.on("error", (err: Error) => {
                this.logger.error("Произошла ошибка: ", err);
                rejects(err);
            });
        });
    }

    async disconnect(): Promise<void> {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.logger.log("Отключение от WebSocket-сервера...");
            this.ws.close();
            this.logger.log("Соединение с сервером закрыто");
        } else {
            this.logger.warn("Попытка отключения от WebSocket, но соединение уже закрыто.");
        }
    }
}
