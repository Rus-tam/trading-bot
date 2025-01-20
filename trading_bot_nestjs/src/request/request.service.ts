import { v4 as uuidv4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { WebsocketService } from "src/websocket/websocket.service";
import { IAccountStatusResult, IAccountStatusParams, IGetServerTime, IRequestBody } from "@types";
import { ConfigService } from "@nestjs/config";
import { timestamp } from "rxjs";

@Injectable()
export class RequestService {
    constructor(
        private readonly websocketService: WebsocketService,
        private readonly configService: ConfigService,
    ) {}

    async testConnection() {
        const ws = await this.websocketService.connect();

        const id = uuidv4();
        const request = {
            id,
            method: "ping",
        };

        ws.send(JSON.stringify(request));

        return new Promise((resolve, reject) => {
            ws.on("message", (message) => {
                const response = JSON.parse(message.toString());
                console.log(" ");
                console.log("RESPONSE", response);
                console.log(" ");
                if (response.id === id && response.result) {
                    resolve(response.result);
                } else {
                    reject(new Error("Ошибка получения времени с API"));
                }
            });
        });
    }

    async timeRequest(): Promise<IGetServerTime> {
        const ws = await this.websocketService.connect();
        const id = uuidv4();
        const request: IRequestBody = {
            id,
            method: "time",
        };

        ws.send(JSON.stringify(request));

        return new Promise((resolve, reject) => {
            ws.on("message", (message) => {
                try {
                    const response = JSON.parse(message.toString());
                    if (response.id === id && response.result) {
                        resolve({ serverTime: response.result });
                    } else {
                        reject(new Error("Ошибка получения времени с API"));
                    }
                } catch (error) {
                    reject(new Error("Ошибка парсинга ответа от WebSocket"));
                }
            });
        });
    }

    async getAccountStatus(signature: string, serverTime: number): Promise<IAccountStatusResult> {
        const ws = await this.websocketService.connect();

        const id = uuidv4();
        const apiKey = this.configService.getOrThrow("API_KEY_TEST");

        const request: IRequestBody = {
            id,
            method: "account.status",
            params: {
                apiKey: apiKey,
                signature,
                timestamp: serverTime,
            },
        };

        ws.send(JSON.stringify(request));

        return new Promise((resolve, reject) => {
            ws.on("message", (message) => {
                try {
                    const response = JSON.parse(message.toString());
                    if (response.id === id && response.result) {
                        resolve(response.result);
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
