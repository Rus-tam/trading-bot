import {
    IAccountOrderListHistoryRes,
    IGetAccountPreventedMatchesRes,
    IGetAccountTradeHistoryRes,
} from "@types";

export type OverallResult =
    | IGetAccountPreventedMatchesRes[]
    | IGetAccountTradeHistoryRes[]
    | IAccountOrderListHistoryRes[];
