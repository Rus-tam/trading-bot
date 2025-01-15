import { Injectable } from "@nestjs/common";
import { IGetKline, IWebSocketKline } from "@types";
import { parse } from "path";

@Injectable()
export class DataProcessingService {
  constructor() { }

  ADCalc(klines: IGetKline): number[] {
    const AD: number[] = [];

    klines.result.list.forEach((item, index) => {
      const close = parseFloat(item[4]);
      const low = parseFloat(item[3]);
      const high = parseFloat(item[2]);
      const volume = parseFloat(item[5]);
      AD.push(((close - low - (high - close)) / (high - low)) * volume);
    });

    return AD;
  }

  EMACalculation(AD: number[], period: number) {
    const ema3: number[] = [];
    const ema10: number[] = [];
    const alpha = 2 / (period + 1);

    ema3[0] = AD[8];
    ema10[0] = AD[0]

    for (let i = 0; i < AD.length; i++) {
      if (i >= 1) {
        ema10.push(AD[i] * alpha + ema10[i - 1] * (1 - alpha));
      }
    }

    for (let i = 9; i < AD.length; i++) {
      ema3.push(AD[i] * alpha + ema3[i - 1] * (1 - alpha));
    }

  }

  chaikinOscWebSocket(klines: IWebSocketKline): number[] {
    const cashFlow: number[] = [];

    klines.data.forEach((kline, index) => {
      const close = parseFloat(kline.close);
      const low = parseFloat(kline.low);
      const high = parseFloat(kline.high);
      const volume = parseFloat(kline.volume);
      cashFlow.push(((close - low - (high - close)) / (high - low)) * volume);
    });

    return cashFlow;
  }
}
