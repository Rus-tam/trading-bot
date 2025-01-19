import { Controller, Get } from "@nestjs/common";
import { RequestService } from "./request.service";
import { IGetServerTime } from "@types";

@Controller("request")
export class RequestController {
    constructor(private readonly requestService: RequestService) {}

    @Get("/ping")
    async testConnection() {
        await this.requestService.testConnection();
    }

    @Get("/time")
    async getServerTime() {
        const response = await this.requestService.timeRequest();

        return response;
    }
}
