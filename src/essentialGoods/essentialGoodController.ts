import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post, Put,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../guards/adminGuard";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetCategoriesQuery } from "./query/impl/get-categories.query";
import { CreateEssentialGoodRequestDto} from "./dtos-swagger";
import { GetCategoryByIdQuery } from "./query/impl/get-category-by-id.query";
import { CreateCategoryCommand} from "./command/impl/create-essentialGood.imple";
import { UpdateEssentialGoodRequestDto } from "./dtos-swagger/update-essentialGood-request.dto";
import { UpdateCategoryCommand } from "./command/impl/update-essentialGood.imple";
import { DeleteCategoryCommand } from "./command/impl/delete-essentialGood.imple";

@Controller("categories")
@ApiTags("categories")
export class EssentialGoodController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  @Get("/")
  @ApiOperation({ description: "get list of categories" })
  async getUsers(@Query() getUsersRequest: GetCategoriesQuery) {
    return this.queryBus.execute<GetCategoriesQuery>(
      new GetCategoriesQuery(getUsersRequest),
    );
  }

  @Post()
  @ApiOperation({ description: "create a user" })
  async createUser(@Body() body: CreateEssentialGoodRequestDto) {
    return this.commandBus.execute(new CreateCategoryCommand(body));
  }

  @Get("/:id")
  @ApiOperation({ description: "get category by id" })
  async getUserById(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      categoryId: string,
  ) {
    return this.queryBus.execute(new GetCategoryByIdQuery(categoryId));
  }

  @Put("/:id")
  @ApiOperation({ description: "update a category" })
  async updateCategory(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      categoryId,
    @Body() body: UpdateEssentialGoodRequestDto,
  ) {
    return this.commandBus.execute(new UpdateCategoryCommand(body, categoryId));
  }

  @Delete("/:id")
  @ApiOperation({ description: "delete a category" })
  async deleteCategory(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      categoryId,
  ) {
    return this.commandBus.execute(new DeleteCategoryCommand(categoryId));
  }
}
