import { SignInUserDto, SignUpUserDto } from "../dtos";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpUserRequestDto extends SignUpUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}