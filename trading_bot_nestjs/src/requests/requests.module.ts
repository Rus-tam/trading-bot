import { Module } from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { RequestsController } from "./requests.controller";
import { WebsocketModule } from "src/websocket/websocket.module";
import { CryptoModule } from "src/crypto/crypto.module";
import { WebsocketService } from "src/websocket/websocket.service";
import { CryptoService } from "src/crypto/crypto.service";

@Module({
    imports: [WebsocketModule, CryptoModule],
    providers: [RequestsService, WebsocketService, CryptoService],
    controllers: [RequestsController],
})
export class RequestsModule {}
