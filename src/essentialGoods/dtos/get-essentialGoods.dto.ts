import { IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class GetEssentialGoodsDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number;
}
