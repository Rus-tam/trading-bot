import httpx
from datetime import datetime
from .schemas import KlineInfo
from ...core.config import settings


class BinanceUtils:
    def __init__(self):
        self.server_time_url = f"{settings.server_time_url}"

    async def _fetch_data(self, url, params):
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(url, params=params, timeout=10.0)
                response.raise_for_status()
                result = response.json()
                return result

            except httpx.RequestError as e:
                return {"error": f"Request failed: {str(e)}"}
            except httpx.HTTPStatusError as e:
                return {"error": f"HTTP error: {str(e)}"}

    async def get_bybit_kline(self, url, symbol="BTCUSDT", interval="1", limit=1000):
        params = {
            "symbol": symbol,
            "interval": interval,
            "timeZone": "+5",
            "limit": limit,
        }
        data = await self._fetch_data(url, params)
        formatted_data = self._parse_historical_kline(data)
        return formatted_data

    async def get_account_info(self, url, params):
        data = await self._fetch_data(url, params=params)

        print(data)

    def _parse_historical_kline(self, row_data):
        formated_klines = []
        for element in row_data:
            formated_klines.append(
                {
                    "open_time": datetime.fromtimestamp(
                        int(element[0]) / 1000
                    ).strftime("%d-%m-%Y %H:%M:%S"),
                    "open": float(element[1]),
                    "high": float(element[2]),
                    "low": float(element[3]),
                    "close": float(element[4]),
                    "volume": float(element[5]),
                    "close_time": datetime.fromtimestamp(
                        int(element[6]) / 1000
                    ).strftime("%d-%m-%Y %H:%M:%S"),
                    "is_closed": True,
                    "quote_asset_volume": float(element[7]),
                    "number_of_trades": int(element[8]),
                    "taker_buy_base_volume": float(element[9]),
                    "taker_buy_quote_volume": float(element[10]),
                }
            )
        formated_klines.pop()

        return formated_klines

    def _parse_kline_data(self, kline: KlineInfo):
        kline_data = {
            "open_time": datetime.fromtimestamp(int(kline["k"]["t"]) / 1000).strftime(
                "%d-%m-%Y %H:%M:%S"
            ),
            "open": float(kline["k"]["o"]),
            "high": float(kline["k"]["h"]),
            "low": float(kline["k"]["l"]),
            "close": float(kline["k"]["c"]),
            "volume": float(kline["k"]["v"]),
            "close_time": datetime.fromtimestamp(int(kline["k"]["T"]) / 1000).strftime(
                "%d-%m-%Y %H:%M:%S"
            ),
            "is_closed": kline["k"]["x"],
            "quote_asset_volume": float(kline["k"]["q"]),
            "number_of_trades": int(kline["k"]["n"]),
            "taker_buy_base_volume": float(kline["k"]["V"]),
            "taker_buy_quote_volume": float(kline["k"]["Q"]),
        }
        return kline_data

    # Дублирует метод _fetch_data
    async def general_request(self, endpoint: str):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(endpoint)
                response.raise_for_status()

                return response.json()
        except httpx.HTTPStatusError as e:
            raise Exception(f"HTTP Error: {e.response.status_code} - {e.response.text}")
        except Exception as e:
            raise Exception(f"Failed to fetch server info: {str(e)}")
