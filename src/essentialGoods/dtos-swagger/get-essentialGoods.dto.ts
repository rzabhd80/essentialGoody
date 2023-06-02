import { ApiPropertyOptional } from "@nestjs/swagger";
import { GetEssentialGoodsDto } from "../dtos";

export class GetCategoriesRequestDto extends GetEssentialGoodsDto {
  @ApiPropertyOptional()
  page: number;

  @ApiPropertyOptional()
  limit: number;
}
