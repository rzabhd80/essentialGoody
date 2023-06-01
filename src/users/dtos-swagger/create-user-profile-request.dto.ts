import { CreateUserProfileDto } from "../dtos/create-user-profile.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { GetUsersDto } from "../dtos/get-users.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserProfileRequest extends CreateUserProfileDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  link: string;
}
