export interface IServerTime {
  retCode: number;
  retMsg: "OK";
  result: IserverTimeResult;
  retExtInfo: {};
  time: number;
}

interface IserverTimeResult {
  timeSecond: string;
  timeNano: string;
}

// {
//     "retCode": 0,
//         "retMsg": "OK",
//             "result": {
//         "timeSecond": "1729360080",
//             "timeNano": "1729360080126745942"
//     },
//     "retExtInfo": { },
//     "time": 1729360080126
// }
