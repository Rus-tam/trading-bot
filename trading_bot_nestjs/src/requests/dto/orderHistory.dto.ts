import { IsNumber, IsString } from "class-validator";

export class OrderHistoryDTO {
    @IsNumber()
    limit: number;

    @IsString()
    symbol: string;
}
