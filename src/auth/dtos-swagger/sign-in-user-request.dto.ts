import { SignInUserDto } from "../dtos";
import { ApiProperty } from "@nestjs/swagger";

export class SignInUserRequestDto extends SignInUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}