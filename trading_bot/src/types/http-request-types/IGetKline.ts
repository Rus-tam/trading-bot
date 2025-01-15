export interface IGetKline {
  retCode: number;
  retMsg: "OK";
  result: IGetKlineResult;
  retExtInfo: {};
  time: number;
}

export interface IGetKlineResult {
  category: "spot" | "linear" | "inverse";
  symbol: string;
  list: IGetKlineResultList[];
}

export interface IGetKlineResultList {
  startTime: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  closePrice: string;
  volume?: string;
  turnover?: string;
}
