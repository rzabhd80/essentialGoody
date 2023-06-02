import { CreateCategoryDto } from "../dtos/create-category.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCategoryRequestDto extends CreateCategoryDto {
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  parentCategoryId: string;
}
