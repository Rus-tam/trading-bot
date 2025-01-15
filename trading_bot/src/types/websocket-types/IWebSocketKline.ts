export interface IWebSocketKline {
  topic: string;
  type: "snapshot";
  ts: number;
  data: IWebSocketKlineData[];
}

export interface IWebSocketKlineData {
  start: number;
  end: number;
  interval: string;
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
  turnover: string;
  confirm: boolean;
  timestamp: number;
}
