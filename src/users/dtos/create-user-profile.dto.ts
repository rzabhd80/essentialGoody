import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateUserProfileDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
