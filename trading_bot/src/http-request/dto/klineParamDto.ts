import { IsNumber, IsString, Max, Min } from "class-validator";

export class KlineParamDto {
  @IsString()
  category: "spot" | "linear" | "inverse";

  @IsString()
  symbol: string;

  interval: 1 | 3 | 5 | 15 | 30 | 60 | 120 | 240 | 360 | 720 | "D" | "M" | "W";

  @IsNumber()
  start?: number;

  @IsNumber()
  end?: number;

  @IsNumber()
  @Min(1)
  @Max(200)
  limit: number;
}
