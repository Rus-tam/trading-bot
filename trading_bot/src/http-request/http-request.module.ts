import { Module } from "@nestjs/common";
import { HttpRequestService } from "./http-request.service";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { MarkerController } from "./market.controller";

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [HttpRequestService],
  controllers: [MarkerController],
  exports: [HttpRequestService],
})
export class HttpRequestModule {}
