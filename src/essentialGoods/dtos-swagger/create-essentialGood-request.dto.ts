import { CreateEssentialGoodDto } from "../dtos/create-essentialGood.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEssentialGoodRequestDto extends CreateEssentialGoodDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  supplierId: string;

  @ApiProperty()
  price: number;
}
