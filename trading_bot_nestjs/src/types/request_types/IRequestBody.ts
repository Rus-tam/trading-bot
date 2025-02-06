import { IUnfilledOrderCount } from "../crypto_types/IUnfilledOrderCount";
import { IAccountStatusParams } from "../crypto_types/IAccountStatusParams";

export interface IRequestBody {
    id: string;
    method: RequestMethod;
    params?: params;
}

type RequestMethod =
    | "time"
    | "account.status"
    | "account.rateLimits.orders"
    | "allOrders"
    | "allOrderLists"
    | "myTrades"
    | "myPreventedMatches";

type params = IAccountStatusParams | IUnfilledOrderCount;
