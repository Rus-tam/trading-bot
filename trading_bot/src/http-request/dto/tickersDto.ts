import { IsString } from "class-validator";

export class TickersDto {
  @IsString()
  category: "spot" | "linear" | "inverse" | "option";

  @IsString()
  symbol: string;

  @IsString()
  baseCoin?: string;

  @IsString()
  expDate?: string;
}
