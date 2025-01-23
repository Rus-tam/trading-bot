export interface IUnfilledOrderCountFirst {
    rateLimitType: "ORDERS";
    interval: "SECOND";
    intervalNum: number;
    limit: number;
    count: number;
}

export interface IUnfilledOrderCountSecond {
    rateLimitType: "ORDERS";
    interval: "DAY";
    intervalNum: number;
    limit: number;
    count: number;
}
