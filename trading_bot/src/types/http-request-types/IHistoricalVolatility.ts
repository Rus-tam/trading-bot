export interface IHistoricalVolatility {
  retCode: number;
  retMsg: "OK";
  result: IHistoricalVolatilityResult;
  retExtInfo: {};
  time: number;
}

interface IHistoricalVolatilityResult {
  category: string;
  list: IHistoricalVolatilityResultList[];
}

interface IHistoricalVolatilityResultList {
  period: number;
  value: string;
  time: string;
}
