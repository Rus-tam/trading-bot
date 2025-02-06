import { IsNumber, IsString } from "class-validator";

export class AccountPreventedMatchesDTO {
    @IsString()
    symbol: string;

    @IsNumber()
    orderId: number;

    @IsNumber()
    limit: number;
}
