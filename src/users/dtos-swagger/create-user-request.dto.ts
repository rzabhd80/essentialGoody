import { CreateUserDto } from "../dtos/create-user.dto";
import { GetUsersDto } from "../dtos/get-users.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserRequest extends CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
