import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../guards/adminGuard";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetUsersQuery } from "./query/impl/get-users.query";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  @Get()
  @ApiOperation({ description: "get list of users" })
  @ApiBearerAuth()
  async getUsers() {
    return this.queryBus.execute<GetUsersQuery>(new GetUsersQuery());
  }
}
