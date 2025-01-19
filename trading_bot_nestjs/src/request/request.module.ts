import { Module } from "@nestjs/common";
import { RequestService } from "./request.service";
import { RequestController } from "./request.controller";
import { WebsocketService } from "src/websocket/websocket.service";
import { WebsocketModule } from "src/websocket/websocket.module";

@Module({
    imports: [WebsocketModule],
    providers: [RequestService, WebsocketService],
    controllers: [RequestController],
})
export class RequestModule {}
