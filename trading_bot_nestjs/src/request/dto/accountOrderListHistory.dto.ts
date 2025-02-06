import { IsNumber } from "class-validator";

export class AccountOrderListHistoryDTO {
    @IsNumber()
    limit: number;
}
