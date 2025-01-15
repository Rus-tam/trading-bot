import { Module } from "@nestjs/common";
import { DataProcessingService } from "./data-processing.service";
import { DataProcessingController } from "./data-processing.controller";
import { HttpRequestModule } from "src/http-request/http-request.module";
import { ChaikinOscService } from "./chaikin-osc.service";

@Module({
  imports: [HttpRequestModule],
  providers: [DataProcessingService, ChaikinOscService],
  controllers: [DataProcessingController],
  exports: [DataProcessingService, ChaikinOscService],
})
export class DataProcessingModule {}
