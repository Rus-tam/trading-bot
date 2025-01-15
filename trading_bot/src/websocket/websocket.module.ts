import { Module } from "@nestjs/common";
import { WebsocketService } from "./websocket.service";
import { DataProcessingModule } from "src/data-processing/data-processing.module";
import { ConfigModule } from "@nestjs/config";
import { WebsocketController } from "./websocket.controller";
import { HttpRequestModule } from "@http-request/http-request.module";

@Module({
  imports: [DataProcessingModule, ConfigModule, HttpRequestModule],
  providers: [WebsocketService],
  exports: [WebsocketService],
  controllers: [WebsocketController],
})
export class WebsocketModule {}
