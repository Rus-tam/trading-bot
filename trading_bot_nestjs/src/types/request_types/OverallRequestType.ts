import {
    IAccountStatusResult,
    IAccountStatusParams,
    IGetServerTime,
    IRequestBody,
    IUnfilledOrderCountFirst,
    IUnfilledOrderCountSecond,
    IGetAccountOrderHistory,
    IGetAccountOrderHistoryResult,
    IGetAccountOrderListHistory,
    IAccountOrderListHistoryRes,
    IGetAccountTradeHistory,
    IGetAccountTradeHistoryRes,
    IGetAccountPreventedMatches,
    IGetAccountPreventedMatchesRes,
} from "@types";

export type OverallRequest =
    | IGetAccountOrderHistory
    | IGetAccountOrderListHistory
    | IGetAccountTradeHistory
    | IGetAccountPreventedMatches;
