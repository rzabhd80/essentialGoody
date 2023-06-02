import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { CreateEssentialGoodDto } from "./create-essentialGood.dto";

export class UpdateEssentialGoodDto extends CreateEssentialGoodDto {

  @IsOptional()
  @IsUUID()
  essentialGoodSupplierId: string[];


}
