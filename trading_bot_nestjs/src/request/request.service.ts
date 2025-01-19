import { v4 as uuidv4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { WebsocketService } from "src/websocket/websocket.service";
import { IAccountRequestParams, IRequestBody } from "@types";

@Injectable()
export class RequestService {
    constructor(private readonly websocketService: WebsocketService) {}

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

    async timeRequest() {
        const ws = await this.websocketService.connect();
        const id = uuidv4();
        const request: IRequestBody = {
            id,
            method: "time",
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

    // async getAccountInfo(params: IAccountRequestParams) {
    //     const id = uuidv4();

    //     const request: IRequestBody = {
    //         id,
    //         method: "account.status",
    //         params: {
    //             apiKey,
    //             signature,
    //             timestamp: serverTime,
    //         },
    //     };

    //     this.ws.send(JSON.stringify(request));
    // }
}
