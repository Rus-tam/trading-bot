import { Module } from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { WebsocketModule } from "src/websocket/websocket.module";
import { CryptoModule } from "src/crypto/crypto.module";
import { WebsocketService } from "src/websocket/websocket.service";
import { CryptoService } from "src/crypto/crypto.service";
import { AccountController } from "./account.controller";
import { MarketController } from "./market.controller";

@Module({
    imports: [WebsocketModule, CryptoModule],
    providers: [RequestsService, WebsocketService, CryptoService],
    controllers: [AccountController, MarketController],
})
export class RequestsModule {}
