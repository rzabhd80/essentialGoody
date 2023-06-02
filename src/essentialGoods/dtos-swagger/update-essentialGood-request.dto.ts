import { CreateEssentialGoodRequestDto } from "./create-essentialGood-request.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateEssentialGoodRequestDto extends CreateEssentialGoodRequestDto {
  @ApiPropertyOptional({ isArray: true })
  essentialGoodSupplierId: string[];
}
