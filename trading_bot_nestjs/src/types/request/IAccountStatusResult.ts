export interface IAccountStatusResult {
    makerCommission: number;
    takerCommission: number;
    buyerCommission: number;
    sellerCommission: number;
    canTrade: boolean;
    canWithdraw: boolean;
    canDeposit: boolean;
    commissionRates: {
        maker: string;
        taker: string;
        buyer: string;
        seller: string;
    };
    brokered: boolean;
    requireSelfTradePrevention: boolean;
    preventSor: boolean;
    updateTime: number;
    accountType: "SPOT";
    balances: IBalances[];
    permissions: ["SPOT"];
    uid: number;
}

interface IBalances {
    asset: string;
    free: string;
    locked: string;
}
