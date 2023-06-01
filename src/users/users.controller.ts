import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../guards/adminGuard";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetUsersQuery } from "./query/impl/get-users.query";
import { CreateUserRequest, GetUsersRequestDto } from "./dtos-swagger";
import { GetUserByIdQuery } from "./query/impl/get-user-by-id.query";
import { CreateUserCommand } from "./command/impl/create-user.imple";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get("/all")
  @ApiOperation({ description: "get list of users" })
  async getUsers(@Query() getUsersRequest: GetUsersRequestDto) {
    return this.queryBus.execute<GetUsersQuery>(
      new GetUsersQuery(getUsersRequest)
    );
  }

  @Post()
  @ApiOperation({ description: "create a user" })
  async createUser(@Body() body: CreateUserRequest) {
    return this.commandBus.execute(new CreateUserCommand(body));
  }

  @Get("/:id")
  @ApiOperation({ description: "get user by id" })
  async getUserById(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    userId: string
  ) {
    return this.queryBus.execute(new GetUserByIdQuery(userId));
  }
}
