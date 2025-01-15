import { IsNumber, IsString } from "class-validator";

export class WebSocketParamsDto {
  @IsString()
  symbol: string;

  @IsNumber()
  depth: number;

  @IsString()
  topic: string;
}
