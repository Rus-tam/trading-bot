import { IAccountStatusParams } from "./IAccountStatusParams";

export interface IRequestBody {
    id: string;
    method: RequestMethod;
    params?: params;
}

type RequestMethod = "time" | "account.status";

type params = IAccountStatusParams;
