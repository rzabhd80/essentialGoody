import { ApiPropertyOptional } from "@nestjs/swagger";
import { GetSuppliersDto } from "../dtos";

export class GetCategoriesRequestDto extends GetSuppliersDto {
  @ApiPropertyOptional()
  page: number;

  @ApiPropertyOptional()
  limit: number;
}
