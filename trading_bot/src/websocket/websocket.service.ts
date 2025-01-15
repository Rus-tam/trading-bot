import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import WebSocket = require("ws");
import { WebSocketParamsDto } from "./dto";
import { Observable, Subject } from "rxjs";

@Injectable()
export class WebsocketService implements OnModuleDestroy {
  private readonly logger = new Logger(WebsocketService.name);
  private ws: WebSocket;
  private isConnected = false;

  private messageSubject = new Subject<any>();

  constructor(private readonly configService: ConfigService) { }

  connect(webSocketParamsDto: WebSocketParamsDto) {
    if (this.isConnected) {
      this.logger.warn("WebSocket подключен");
      return;
    }

    this.ws = new WebSocket(this.configService.getOrThrow("TESTNET_WEBSOCKET_SPOT"));

    this.ws.on("open", () => {
      this.isConnected = true;
      this.subscribeToChannel(webSocketParamsDto);
      this.logger.log("Открыто соединение к WebSocket API Bybit");
    });

    this.ws.on("message", (data: string) => {
      const parsedData = JSON.parse(data);
      this.handleMessage(parsedData);
    });

    this.ws.on("error", (error) => {
      this.logger.error(`Ошибка соединения: ${error.message}`);
    });

    this.ws.on("close", () => {
      this.isConnected = false;
      this.logger.warn("WebSocket соединение к API Bybit закрыто");
    });
  }

  private handleMessage(data: any) {
    if (data && data.topic) {
      // this.logger.log(`Received data from ${data.topic}: ${JSON.stringify(data)}`);
      // this.logger.log(data);
      this.messageSubject.next(data);
    }
  }

  subscribeToChannel(webSocketParamsDto: WebSocketParamsDto) {
    const topic = webSocketParamsDto.topic;
    const depth = webSocketParamsDto.depth;
    const symbol = webSocketParamsDto.symbol;
    if (!this.isConnected) {
      this.logger.warn("Не удается подписаться на канал. Отсутствует WebSocket подключение");
      return;
    }

    const message = JSON.stringify({
      op: "subscribe",
      args: [`${topic}.${depth}.${symbol}`],
    });

    this.ws.send(message);

    this.logger.log(`Подписка на канал прошла успешно. Depth - ${depth}, Symbol - ${symbol}`);
  }

  getMessageStream(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  onModuleDestroy() {
    this.ws?.close();
  }
}
