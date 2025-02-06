export interface IAccountOrderListHistoryRes {
    orderListId: string;
    contingencyType: string;
    listStatusType: string;
    listOrderStatus: string;
    listClientOrderId: string;
    transactionTime: number;
    symbol: string;
    orders: IOrders[];
}

interface IOrders {
    symbol: string;
    orderId: number;
    cliendOrderId: string;
}
