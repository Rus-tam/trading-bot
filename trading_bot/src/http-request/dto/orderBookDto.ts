import { IsString, Max, Min } from "class-validator";

export class OrderBookDto {
  @IsString()
  category: "spot" | "linear" | "inverse" | "option";

  @IsString()
  symbol: string;

  @IsString()
  @Min(1)
  @Max(200)
  limit?: number;
}
