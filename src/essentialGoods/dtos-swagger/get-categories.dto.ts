import { ApiPropertyOptional } from "@nestjs/swagger";
import { GetCategoriesDto } from "../dtos";

export class GetCategoriesRequestDto extends GetCategoriesDto {
  @ApiPropertyOptional()
  page: number;

  @ApiPropertyOptional()
  limit: number;
}
