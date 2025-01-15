export interface IOpenInterest {
  retCode: number;
  retMsg: "OK";
  result: IOpenInterestResult;
  retExtInfo: {};
  time: 1730032267929;
}

interface IOpenInterestResult {
  category: "linear" | "inverse";
  symbol: string;
  list: IOpenInterestResultList[];
  nextPageCursor: string;
}

interface IOpenInterestResultList {
  openInterest: string;
  timestamp: string;
}
