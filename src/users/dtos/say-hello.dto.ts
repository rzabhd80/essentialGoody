import { IsNotEmpty, IsString } from "class-validator";

export class SayHellDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}