export interface IRequestBody {
    id: string;
    method: RequestMethod;
}

type RequestMethod = "time" | "account.status";
