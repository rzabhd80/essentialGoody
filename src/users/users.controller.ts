import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param, ParseUUIDPipe,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../guards/adminGuard";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetUsersQuery } from "./query/impl/get-users.query";
import { GetUsersRequestDto } from "./dtos-swagger";
import { GetUserByIdQuery } from "./query/impl/get-user-by-id.query";
import { SayHelloRequestDto } from "./dtos-swagger/say-hello-request.dto";
import { SayHelloQuery } from "./query/impl/say-hello.query";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  @Get("/hello")
  @ApiOperation({ description: "Get a simple hello" })
  async sayHello(@Query() sayHello: SayHelloRequestDto) {
    return this.queryBus.execute(new SayHelloQuery(sayHello));
  }

  @Get("/all")
  @ApiOperation({ description: "get list of users" })
  async getUsers(@Query() getUsersRequest: GetUsersRequestDto) {
    return this.queryBus.execute<GetUsersQuery>(new GetUsersQuery(getUsersRequest));
  }

  @Get("/:id")
  @ApiOperation({ description: "get user by id" })
  async getUserById(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      userId: string) {
    return this.queryBus.execute(new GetUserByIdQuery(userId));
  }
}
