import { Injectable } from "@nestjs/common";
import { IEMAResult, IGetKlineResultList, IWebSocketKline, IWebSocketKlineData } from "@types";
import { EMAStreamDto } from "@websocket/dto";
import * as fs from 'fs';

@Injectable()
export class ChaikinOscService {
    constructor() { }

    ADHistoricalCalculation(klines: IGetKlineResultList[]): number[] {
        const AD: number[] = [];
        for (let i = 0; i < klines.length; i++) {
            let close = parseFloat(klines[i][4]);
            let low = parseFloat(klines[i][3]);
            const high = parseFloat(klines[i][2]);
            const volume = parseFloat(klines[i][5]);

            if (high !== low) {
                AD.push(((close - low - (high - close)) / (high - low)) * volume);
            }
        }

        return AD;
    }

    ADCalcExperimental(klines: IWebSocketKlineData[]): number {
        const ad: number[] = [];
        for (let i = 0; i < klines.length; i++) {
            ad.push(this.ADCalculation(klines[i]));
        }

        return ad[ad.length - 1];
    }

    ADLCalculation(last: number, penultimate: number): number {
        return penultimate + last;
    }

    ADCalculation(kline: IWebSocketKlineData): number {
        let MFM = 0;
        let MFV = 0;
        const close = parseFloat(kline.close);
        const low = parseFloat(kline.low);
        const high = parseFloat(kline.high);
        const volume = parseFloat(kline.volume);
        const turnover = parseFloat(kline.turnover);

        // console.log(' ');
        // console.log('********************');
        // console.log(kline.open, kline.high, kline.low, kline.close);
        // console.log('********************');
        // console.log(' ');

        if (high !== low) {
            let numerator = close - low - (high - close);
            let denominator = high - low;
            MFM = numerator / denominator;
            MFV = MFM * volume;
        }

        if (!isNaN(MFV) && MFV !== undefined) {
            return MFV;
        }
    }

    EMACalculation(AD: number[]): IEMAResult {
        const EMA3: number[] = [];
        const EMA10: number[] = [];
        const alpha_short = 2 / (3 + 1);
        const alpha_long = 2 / (10 + 1);

        EMA3[0] = AD[AD.length - 5];
        EMA10[0] = AD[0];

        for (let i = 1; i < AD.length; i++) {
            // EMA3[i] = AD[i] * alpha_short + EMA3[i - 1] * (1 - alpha_short);
            EMA10[i] = AD[i] * alpha_short + EMA10[i - 1] * (1 - alpha_long);
        }

        for (let i = 1; i < 3; i++) {
            EMA3[i] = AD[AD.length - 5 + i] * alpha_short + EMA3[i - 1] * (1 - alpha_short);
        }

        return {
            EMA3: EMA3,
            EMA10: EMA10,
        };
    }

    EMAExperimental(EMAPrevious: number, ADLLast: number, period: number) {
        const alpha = 2 / (period + 1);

        return (ADLLast * alpha + EMAPrevious * (1 - alpha));
    }

    EMAStreamCalculation(EMAStreamDto: EMAStreamDto) {
        const period = 2 / (EMAStreamDto.period + 1);

        return EMAStreamDto.AD * period + EMAStreamDto.EMA * (1 - period);
    }

    chaikinOscCalculation(EMA3: number[], EMA10: number[]): number[] {
        console.log('EMA10 length', EMA10.length);
        const CO: number[] = [];

        for (let i = 0; i < EMA3.length; i++) {
            CO[i] = EMA3[i] - EMA10[i];
        }

        return CO;
    }

    createJSONInfoFile(klines: IWebSocketKlineData[]) {
        const data: IWebSocketKlineData[] = [];

        for (let i = 0; i < klines.length; i++) {
            data.push(klines[i]);
        }

        const jsonData = JSON.stringify(data, null, 2);

        fs.writeFile("infos", jsonData, (err) => {
            if (err) {
                console.error("Ошибка при записи файла:", err);
            } else {
                console.log("Данные успешно сохранены в файл", "info");
            }
        });


    }
}
