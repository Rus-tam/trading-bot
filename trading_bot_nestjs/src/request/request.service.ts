import { v4 as uuidv4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { WebsocketService } from "src/websocket/websocket.service";
import {
    IAccountStatusResult,
    IAccountStatusParams,
    IGetServerTime,
    IRequestBody,
    IUnfilledOrderCountFirst,
    IUnfilledOrderCountSecond,
    IGetAccountOrderHistory,
    IGetAccountOrderHistoryResult,
    IGetAccountOrderListHistory,
    IAccountOrderListHistoryRes,
    IGetAccountTradeHistory,
    IGetAccountTradeHistoryRes,
    IGetAccountPreventedMatches,
} from "@types";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RequestService {
    private apiKey: string;
    constructor(
        private readonly websocketService: WebsocketService,
        private readonly configService: ConfigService,
    ) {
        // this.apiKey = this.configService.getOrThrow("API_KEY_TEST");
        this.apiKey = this.configService.getOrThrow("API_KEY");
    }

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

        const request: IRequestBody = {
            id,
            method: "account.status",
            params: {
                apiKey: this.apiKey,
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

    async getUnfilledOrderCount(
        signature: string,
        serverTime: number,
    ): Promise<[IUnfilledOrderCountFirst, IUnfilledOrderCountSecond]> {
        const ws = await this.websocketService.connect();

        const id = uuidv4();

        const request: IRequestBody = {
            id,
            method: "account.rateLimits.orders",
            params: {
                apiKey: this.apiKey,
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

    async getAccountOrderHistory(params: IGetAccountOrderHistory): Promise<IGetAccountOrderHistoryResult> {
        const ws = await this.websocketService.connect();

        const id = uuidv4();

        const request: IRequestBody = {
            id,
            method: "allOrders",
            params: params,
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

    async getAccountOrderListHistory(
        params: IGetAccountOrderListHistory,
    ): Promise<IAccountOrderListHistoryRes[]> {
        const ws = await this.websocketService.connect();

        const id = uuidv4();

        const request: IRequestBody = {
            id,
            method: "allOrderLists",
            params: params,
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

    async getAccountTradeHistory(params: IGetAccountTradeHistory): Promise<IGetAccountTradeHistoryRes[]> {
        const ws = await this.websocketService.connect();

        const id = uuidv4();

        const request: IRequestBody = {
            id,
            method: "myTrades",
            params: params,
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

    async getAccountPreventedMatches(params: IGetAccountPreventedMatches) {
        const ws = await this.websocketService.connect();

        const id = uuidv4();

        const request: IRequestBody = {
            id,
            method: "myPreventedMatches",
            params: params,
        };

        ws.send(JSON.stringify(request));

        return new Promise((resolve, reject) => {
            ws.on("message", (message) => {
                try {
                    const response = JSON.parse(message.toString());
                    console.log(" ");
                    console.log(response);

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
