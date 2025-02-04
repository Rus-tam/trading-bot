import { IsNumber, IsString } from "class-validator";

export class AccountOrderHistoryDTO {
    @IsNumber()
    limit: number;

    @IsString()
    symbol: string;
}
