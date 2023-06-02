import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateEssentialGoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  supplierId: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsUUID()
  @IsNotEmpty()
  measurementId: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID(undefined, { each: true })
  categoryIds: string[];

}
