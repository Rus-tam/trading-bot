import { IsNumber, IsString } from "class-validator";

export class HistoricalVolatilityDto {
  @IsString()
  category: "option";

  @IsString()
  baseCoin?: string;

  @IsString()
  period?: string;

  @IsNumber()
  startTime?: number;

  @IsNumber()
  endTime?: number;
}
