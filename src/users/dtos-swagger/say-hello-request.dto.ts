import { SayHellDto } from "../dtos";
import { ApiProperty } from "@nestjs/swagger";

export class SayHelloRequestDto extends SayHellDto {
  @ApiProperty()
  name: string;
}