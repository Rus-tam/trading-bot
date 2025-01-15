import { IsNumber, IsString, Max, Min } from "class-validator";

export class OpenInterestDto {
  @IsString()
  category: "linear" | "inverse";

  @IsString()
  symbol: string;

  @IsString()
  intervalTime: "5min" | "15min" | "30min" | "1h" | "4h" | "1d";

  @IsNumber()
  startTime?: number;

  @IsNumber()
  endTime?: number;

  @IsNumber()
  @Min(1)
  @Max(200)
  limit?: number;

  @IsString()
  cursor?: string;
}
