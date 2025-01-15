export interface IWalletBalance {
  retCode: number;
  retMsg: "OK";
  result: IWalletBalanceResult;
  retExtInfo: {};
  time: number;
}

interface IWalletBalanceResult {
  list: [
    {
      totalEquity: string;
      accountIMRate: string;
      totalMarginBalance: string;
      totalInitialMargin: string;
      accountType: "UNIFIED" | "STANDART";
      totalAvailableBalance: string;
      accountMMRate: string;
      totalPerpUPL: string;
      totalWalletBalance: string;
      accountLTV: string;
      totalMaintenanceMargin: string;
      coin: ICoin[];
    },
  ];
}

interface ICoin {
  availableToBorrow: string;
  bonus: string;
  accruedInterest: string;
  availableToWithdraw: string;
  totalOrderIM: string;
  equity: string;
  totalPositionMM: string;
  usdValue: string;
  unrealisedPnl: string;
  collateralSwitch: true | false;
  spotHedgingQty: string;
  borrowAmount: string;
  totalPositionIM: string;
  walletBalance: string;
  cumRealisedPnl: string;
  locked: string;
  marginCollateral: true | false;
  coin: string;
}
