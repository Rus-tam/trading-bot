import { Body, Controller, Logger, OnModuleInit, Post } from "@nestjs/common";
import { WebsocketService } from "./websocket.service";
import { EMAStreamDto, WebSocketChaikinOscDto, WebSocketParamsDto } from "./dto";
import { DataProcessingService } from "src/data-processing/data-processing.service";
import { IGetKline, IWebSocketKline, IWebSocketKlineData } from "@types";
import { HttpRequestService } from "@http-request/http-request.service";
import { KlineParamDto } from "@http-request/dto";
import { ChaikinOscService } from "src/data-processing/chaikin-osc.service";
import { last } from "rxjs";

@Controller("websocket")
export class WebsocketController {
    private readonly logger = new Logger(WebsocketController.name);
    constructor(
        private readonly websocketService: WebsocketService,
        private readonly dataProcessingService: DataProcessingService,
        private readonly chaikinOscService: ChaikinOscService,
        private readonly httpRequestService: HttpRequestService,
    ) { }

    @Post("connect")
    async connect(@Body() webSocketParamsDto: WebSocketParamsDto) {

    }

    @Post("chaikin-osc-stream")
    async webSocketChaikinOsc(@Body() webSocketChaikinOscDto: WebSocketParamsDto) {
        console.log(webSocketChaikinOscDto);

        this.websocketService.connect(webSocketChaikinOscDto);

        this.websocketService.getMessageStream().subscribe((kline: IWebSocketKline) => {
            const data: IWebSocketKlineData = kline.data[0];

            if (data.confirm) {
                console.log(data);
                console.log(" ");
            }
        })
    }

    @Post("close-connection")
    closeConnection() {
        this.websocketService.onModuleDestroy();
    }
}
