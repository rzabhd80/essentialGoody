import { CreateMeasurementUnitDto } from "../dtos/create-measurementUnit.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMeasurementUnitRequestDto extends CreateMeasurementUnitDto {
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  symbol: string;
}
