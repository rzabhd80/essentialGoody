import { CreateSupplierDto } from "../dtos/create-supplier.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateSupplierRequestDto extends CreateSupplierDto {
  @ApiProperty()
  name: string;
}
