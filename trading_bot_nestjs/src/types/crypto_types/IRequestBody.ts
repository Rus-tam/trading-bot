import { IAccountRequestParams } from "./IAccountRequestParams";

export interface IRequestBody {
    id: string;
    method: RequestMethod;
    params?: params;
}

type RequestMethod = "time" | "account.status";

type params = IAccountRequestParams;
