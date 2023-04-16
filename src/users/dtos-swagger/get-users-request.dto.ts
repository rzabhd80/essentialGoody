import { GetUsersDto } from "../dtos/get-users.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUsersRequestDto extends GetUsersDto {
  @ApiPropertyOptional()
  page: number;

  @ApiPropertyOptional()
  limit: number;
}