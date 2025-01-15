import { Body, Controller, Get } from "@nestjs/common";
import { HttpRequestService } from "./http-request.service";
import {
  IBybitError,
  IServerTime,
  IWalletBalance,
  IGetKline,
  IOrderBook,
  IFundingHistory,
  IOpenInterest,
  IHistoricalVolatility,
  IGetKlineResultList,
} from "@types";
import {
  FundingHistoryDto,
  HistoricalVolatilityDto,
  KlineParamDto,
  OpenInterestDto,
  OrderBookDto,
  TickersDto,
} from "./dto";

@Controller("market")
export class MarkerController {
  constructor(private readonly httpRequestServer: HttpRequestService) { }

  /*
        Категории на Bybit разделены на два типа аккаунтов: Unified Account и Classic Account. Каждый из них предлагает
    разные виды контрактов для различных стратегий торговли:
        
        1. Unified Account

        Unified Account — это тип аккаунта, который позволяет торговать различными продуктами и поддерживает
    унифицированную маржу. То есть один и тот же баланс может использоваться для обеспечения разных торговых операций.

        spot: стандартная спотовая торговля без плеча, где можно покупать или продавать активы напрямую.
        linear: контракты на основе USDT и USDC, которые включают:
            USDT perpetual — бессрочные контракты, номинированные в USDT.
            USDC perpetual — бессрочные контракты, номинированные в USDC.
            USDC futures — срочные фьючерсные контракты на основе USDC с фиксированными датами исполнения.
        inverse: инверсные контракты, где расчет ведется в базовой валюте. Включает:
            Inverse perpetual — инверсные бессрочные контракты, номинированные в базовой валюте, такой как BTC или ETH.
            Inverse futures — инверсные фьючерсные контракты с фиксированными датами исполнения.
        option: опционы, которые дают право, но не обязательство, купить или продать актив по заранее
        установленной цене до или в день истечения срока.

        2. Classic Account

        Classic Account — это традиционный тип аккаунта Bybit. Он менее гибок в плане маржи, но поддерживает основные
    контракты:

        linear: USDT perpetual — бессрочные контракты, номинированные в USDT, где стоимость рассчитывается в USDT.
        inverse: инверсные контракты, включая:
        Inverse perpetual — инверсные бессрочные контракты, номинированные в базовой валюте.
        Inverse futures — инверсные фьючерсные контракты с установленными сроками.
        spot: стандартная спотовая торговля.

        Основные различия между Unified и Classic Account

        Unified Account более гибок в плане использования маржи, позволяя трейдерам использовать один и тот же
    баланс для разных контрактов.
        Classic Account менее универсален, но традиционно удобен для пользователей, которые хотят торговать
    определенными контрактами без гибкости унифицированной маржи.

        Эти категории дают возможность выбора инструментов в зависимости от торговых потребностей, позволяя 
    торговать спотовыми активами, фьючерсами, бессрочными контрактами и опционами на базе разных типов маржи.
    */

  // Возвращает серверное время API Bybit. Может быть использовано для проверки подключения приложения к API
  @Get("server-time")
  async checkServerTime(): Promise<IServerTime | IBybitError> {
    const path = "market/time";
    const query = "";
    return this.httpRequestServer.makeRequest(path, query);
  }

  /*
    Get Kline (/v5/market/kline): 
    Возвращает стандартные рыночные свечи (кандидлы) для указанных символов. Отражает реальные цены, по которым
осуществляются сделки (открытие, максимум, минимум, закрытие) и объемы торгов. Поддерживает все рынки, включая спот
и фьючерсы (USDT, USDC, инверсные контракты).

    Get Mark Price Kline (/v5/market/mark-price-kline):
    Возвращает свечи на основе маркированной цены. Это средняя цена, рассчитанная для минимизации влияния резких
рыночных колебаний, используется на рынках фьючерсов (USDT и USDC, инверсные контракты) для защиты от манипуляций
и предотвращения ненужных ликвидаций.

    Get Index Price Kline (/v5/market/index-price-kline):
    Предоставляет свечи по индексной цене. Индексная цена рассчитывается на основе нескольких биржевых данных и
показывает среднюю рыночную цену актива. Она служит эталоном для фьючерсных контрактов, помогая трейдерам
ориентироваться на глобальную рыночную цену.

    Get Premium Index Price Kline (/v5/market/premium-index-price-kline):
    Возвращает свечи, основанные на индексе премий, показывающем разницу между маркированной и индексной ценами.
Используется в расчетах для защиты трейдеров от резких скачков и поддержания справедливой цены.
    */

  // Возвращает данные по свече
  @Get("get-kline")
  async getKline(@Body() params: KlineParamDto): Promise<IGetKline | IBybitError> {
    const path = "market/kline";
    const query = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const klines: IGetKline = await this.httpRequestServer.makeRequest(path, query);
    const list: IGetKlineResultList[] = klines.result.list;

    const klineInfo = [];

    list.forEach((kline, index) => {
      let dateMillisec = new Date(parseInt(kline[0]));

      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };

      const date = dateMillisec.toLocaleString('ru', options);

      const info = {
        "startTime": date,
        "openPrice": kline[1],
        "highPrice": kline[2],
        "lowPrice": kline[3],
        "closePrice": kline[4],
        "volume": kline[5]
      }

      klineInfo.push(info)
    });

    console.log(klineInfo);



    return klines;
  }

  // Get mark price kline. Query for historical mark price klines.
  // Charts are returned in groups based on the requested interval
  @Get("mark-price-kline")
  async getMarkPriceKline(@Body() params: KlineParamDto): Promise<IGetKline | IBybitError> {
    const path = "market/mark-price-kline";
    const query = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return this.httpRequestServer.makeRequest(path, query);
  }

  @Get("index-price-kline")
  async getIndexPriceKline(@Body() params: KlineParamDto): Promise<IGetKline | IBybitError> {
    const path = "market/index-price-kline";
    const query = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return this.httpRequestServer.makeRequest(path, query);
  }

  @Get("premium-index-price-kline")
  async getPremiumIndexPriceKline(@Body() params: KlineParamDto) {
    const path = "market/premium-index-price-kline";
    const query = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return this.httpRequestServer.makeRequest(path, query);
  }

  // Get OrderBook
  @Get("orderbook")
  async getOrderBook(@Body() params: OrderBookDto): Promise<IOrderBook | IBybitError> {
    const path = "market/orderbook";
    const query = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return this.httpRequestServer.makeRequest(path, query);
  }

  // Query for the latest price snapshot, best bid/ask price, and trading volume in the last 24 hours.
  /*
        baseCoin — это базовая валюта для торговой пары. В каждой торговой паре есть две валюты: базовая и котируемая.
        Базовая валюта (baseCoin) — это актив, который покупается или продается. Например, в паре BTCUSDT,
        BTC является базовой валютой.
        Котируемая валюта — это валюта, в которой выражена цена базовой валюты, в нашем примере USDT.
        baseCoin особенно важен для таких категорий, как опционы и фьючерсы. В опционах Bybit требуется
        указывать baseCoin (например, BTC или ETH) для правильного отображения всех доступных контрактов
        с выбранной базовой монетой.
     */
  @Get("tickers")
  async getTickers(@Body() params: TickersDto) {
    const path = "market/tickers";
    const query = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return this.httpRequestServer.makeRequest(path, query);
  }

  // Исторические данные о ставках финансирования для бессрочных контрактов (perpetual contracts) на
  // криптовалютной бирже
  @Get("funding/history")
  async getFundingHistory(@Body() params: FundingHistoryDto): Promise<IFundingHistory | IBybitError> {
    const path = "market/funding/history";
    const query = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return this.httpRequestServer.makeRequest(path, query);
  }

  /*
        Open interest — это показатель, который отражает общее количество открытых позиций по бессрочным контрактам
    на платформе в данный момент. Он показывает, сколько контрактов находится в обращении, но еще не были закрыты или
    компенсированы противоположными сделками. Этот индикатор важен, так как:
        - Указывает активность и ликвидность рынка: высокий open interest обычно указывает на значительный интерес
        трейдеров и ликвидность;
        - Сигнализирует о тренде: растущий open interest в сочетании с ростом цены может подтверждать восходящий тренд,
        так как трейдеры открывают новые позиции в ожидании продолжения движения цены. Аналогично, падающий
        open interest может указывать на завершение тренда, когда трейдеры закрывают свои позиции.

        Таким образом, open interest предоставляет полезную информацию о настроении участников рынка и возможных
    движениях цены в будущем.
    */

  @Get("open-interest")
  async getOpenInterest(@Body() params: OpenInterestDto): Promise<IOpenInterest | IBybitError> {
    const path = "market/open-interest";
    const query = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return this.httpRequestServer.makeRequest(path, query);
  }

  /*
        Маршрут Get Historical Volatility предоставляет исторические данные по волатильности для опционов (Option)
    на определенную базовую монету. Данные помогают анализировать прошлые изменения волатильности — важного показателя
    для оценки цен на опционы и рыночной активности. 
    */

  @Get("historical-volatility")
  async getHistoricalVolatility(
    @Body() params: HistoricalVolatilityDto,
  ): Promise<IHistoricalVolatility | IBybitError> {
    const path = "market/historical-volatility";
    const query = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return this.httpRequestServer.makeRequest(path, query);
  }

  // Возвращает данные по средствам в Unified Trading
  @Get("wallet-balance")
  async makeSignedRequest(@Body() coin: { coin: string }): Promise<IWalletBalance | IBybitError> {
    const path = "account/wallet-balance";
    const query = `accountType=UNIFIED&coin=${coin.coin}`;
    return this.httpRequestServer.makeSignedRequest(path, query);
  }

}
