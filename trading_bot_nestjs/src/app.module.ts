import { Module } from "@nestjs/common";
import { BinanceModule } from "./binance/binance.module";
import { WebsocketModule } from "./websocket/websocket.module";
import { ConfigModule } from "@nestjs/config";
import { CryptoModule } from "./crypto/crypto.module";
import { RequestModule } from "./request/request.module";
import { RequestsModule } from './requests/requests.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        BinanceModule,
        WebsocketModule,
        CryptoModule,
        RequestModule,
        RequestsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
