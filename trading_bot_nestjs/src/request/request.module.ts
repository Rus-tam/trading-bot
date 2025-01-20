import { Module } from "@nestjs/common";
import { RequestService } from "./request.service";
import { RequestController } from "./request.controller";
import { WebsocketService } from "src/websocket/websocket.service";
import { WebsocketModule } from "src/websocket/websocket.module";
import { CryptoModule } from "src/crypto/crypto.module";
import { CryptoService } from "src/crypto/crypto.service";

@Module({
    imports: [WebsocketModule, CryptoModule],
    providers: [RequestService, WebsocketService, CryptoService],
    controllers: [RequestController],
})
export class RequestModule {}
