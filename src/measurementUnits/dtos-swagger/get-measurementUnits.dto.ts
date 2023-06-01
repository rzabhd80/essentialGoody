import { ApiPropertyOptional } from "@nestjs/swagger";
import { GetMeasurementUnitsDto } from "../dtos";

export class GetCategoriesRequestDto extends GetMeasurementUnitsDto {
  @ApiPropertyOptional()
  page: number;

  @ApiPropertyOptional()
  limit: number;
}
