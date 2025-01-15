import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { HttpRequestModule } from "./http-request/http-request.module";
import { DataProcessingModule } from "./data-processing/data-processing.module";
import { WebsocketModule } from "./websocket/websocket.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    HttpRequestModule,
    DataProcessingModule,
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
