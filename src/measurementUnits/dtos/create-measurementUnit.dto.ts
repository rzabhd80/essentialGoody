import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMeasurementUnitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  symbol: string;
}
