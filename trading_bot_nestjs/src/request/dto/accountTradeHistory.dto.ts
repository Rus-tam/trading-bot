import { IsString } from "class-validator";

export class AccountTradeHistoryDTO {
    @IsString()
    symbol: string;
}
