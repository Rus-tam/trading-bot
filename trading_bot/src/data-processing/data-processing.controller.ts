import { Body, Controller, Get, Post } from "@nestjs/common";
import { DataProcessingService } from "./data-processing.service";
import { KlineParamDto } from "@http-request/dto";
import { HttpRequestService } from "@http-request/http-request.service";
import { IBybitError, IGetKline } from "@types";
import { ChaikinOscService } from "./chaikin-osc.service";

@Controller("data-processing")
export class DataProcessingController {
  constructor(
    private readonly dataProcessingService: DataProcessingService,
    private readonly httpRequestService: HttpRequestService,
    private readonly chaikinOscService: ChaikinOscService,
  ) {}

  @Post("chaikin")
  async getChaikinOsc(@Body() params: KlineParamDto) {
    const path = "market/kline";
    const query = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    console.log(query);

    // const klines: IGetKline = await this.httpRequestService.makeRequest(path, query);

    // const ADHistorical = this.chaikinOscService.ADHistoricalCalculation(klines.result.list);

    // const { EMA3, EMA10 } = this.chaikinOscService.EMACalculation(ADHistorical);

    // const CO = this.chaikinOscService.chaikinOscCalculation(EMA3, EMA10);

    // return CO;
  }
}
