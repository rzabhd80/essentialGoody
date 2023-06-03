import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  parentCategoryId: string;
}
