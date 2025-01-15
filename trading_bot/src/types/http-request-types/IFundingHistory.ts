export interface IFundingHistory {
  retCode: number;
  retMsg: "OK";
  result: IFundingHistoryResult;
}

interface IFundingHistoryResult {
  category: "linear" | "inverse";
  list: IFundingHistoryResultList[];
}

interface IFundingHistoryResultList {
  symbol: string;
  fundingRate: string;
  fundingRateTimestamp: string;
}
