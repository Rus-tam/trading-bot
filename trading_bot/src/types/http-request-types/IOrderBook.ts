export interface IOrderBook {
  retCode: number;
  retMsg: "OK";
  result: result;
  retExtInfo: {};
  time: number;
}

interface result {
  s: string;
  b: bid[];
  a: ask[];
  ts: number;
  u: number;
  seq: number;
  ctc: number;
}

interface bid {
  bidPrice: string;
  bidSize: string;
}

interface ask {
  askPrice: string;
  askSize: string;
}
