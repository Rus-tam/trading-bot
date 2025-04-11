import { IsNumber, IsString } from "class-validator";

export class KlinesDTO {
    @IsString()
    symbol: string;

    @IsString()
    interval: string;

    @IsNumber()
    limit: number;
}
