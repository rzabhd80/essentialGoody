import { SignInUserDto, SignUpUserDto } from "../dtos";
import { ApiProperty } from "@nestjs/swagger";

export class SignInUserRequestDto extends SignUpUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}