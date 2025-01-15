import { Controller, Get } from "@nestjs/common";
import { WebsocketService } from "./websocket.service";

@Controller("websocket")
export class WebsocketController {
    constructor(private readonly websocketService: WebsocketService) {}

    @Get("/connect")
    async connect() {
        this.websocketService.connect();
    }

    @Get("/disconnect")
    async disconnect() {
        this.websocketService.disconnect();
    }
}
