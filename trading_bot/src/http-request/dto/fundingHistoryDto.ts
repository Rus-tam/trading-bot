import { IsNumber, IsString, Max, Min } from "class-validator";

export class FundingHistoryDto {
  @IsString()
  category: "linear" | "inverse";

  @IsString()
  symbol: string;

  @IsNumber()
  startTime?: number;

  @IsNumber()
  endTime?: number;

  @IsNumber()
  @Min(1)
  @Max(200)
  limit?: number;
}
