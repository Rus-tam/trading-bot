import { Controller, Get } from "@nestjs/common";
import { RequestsService } from "./requests.service";

@Controller("requests")
export class RequestsController {
    constructor(private readonly requestsService: RequestsService) {}

    @Get("/server-time")
    async getServerTime() {
        const serverTime = await this.requestsService.getServerTime();
        return serverTime;
    }
}
