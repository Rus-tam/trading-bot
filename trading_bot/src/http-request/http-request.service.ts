import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import * as crypto from "crypto";
import { IBybitError, IServerTime } from "@types";
import { escape } from "querystring";

@Injectable()
export class HttpRequestService {
  private apiKey = this.configService.getOrThrow("TESTNET_API_KEY");
  private apiSecret = this.configService.getOrThrow("TESTNET_API_SECRET");
  private baseUrl = this.configService.getOrThrow("TESTNET");
  private logger = new Logger(HttpRequestService.name);
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) { }

  async makeRequest(path: string, query: string) {
    const url = `${this.baseUrl}${path}?${query}`;

    try {
      const responce = await firstValueFrom(this.httpService.get(url));
      if (responce.data) {
        this.logger.log(`Запрос к ${path} выполнен успешно`);
      }
      return responce.data;
    } catch (error) {
      this.logger.error("Error connecting to Bybit API", error);
      return {
        message: "Unable to connect to Bybit API",
        statusCode: error?.response?.status || 500,
      };
    }
  }

  private createSignature(params: string): string {
    const hmac = crypto.createHmac("sha256", this.apiSecret);
    hmac.update(params);

    return hmac.digest("hex");
  }

  async makeSignedRequest(path: string, query: string): Promise<any | IBybitError> {
    const recvWindow = 5000;
    const timestamp = Date.now().toString();
    const paramString = `${timestamp}${this.apiKey}${recvWindow}${query}`;

    const signature = this.createSignature(paramString);

    const headers = {
      "X-BAPI-API-KEY": this.apiKey,
      "X-BAPI-TIMESTAMP": timestamp,
      "X-BAPI-RECV-WINDOW": recvWindow.toString(),
      "X-BAPI-SIGN": signature,
    };

    const url = `${this.baseUrl}${path}?${query}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url, { headers }));
      return response.data;
    } catch (error) {
      this.logger.error("Error connecting to Bybit API", error);
      return {
        message: "Unable to get requested info",
        statusCode: error?.response?.status || 500,
      };
    }
  }
}
