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
import { GetCategoriesQuery } from "./query/impl/get-categories.query";
import { CreateUserRequest, GetUsersRequestDto } from "./dtos-swagger";
import { GetCategoryByIdQuery } from "./query/impl/get-category-by-id.query";
import { CreateUserCommand } from "./command/impl/create-category.imple";

@Controller("categories")
@ApiTags("categories")
export class CategoryController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get("/")
  @ApiOperation({ description: "get list of categories" })
  async getUsers(@Query() getUsersRequest: GetUsersRequestDto) {
    return this.queryBus.execute<GetCategoriesQuery>(
      new GetCategoriesQuery(getUsersRequest)
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
    return this.queryBus.execute(new GetCategoryByIdQuery(userId));
  }
}
