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
import { CreateEssentialGoodRequestDto } from "./dtos-swagger";
import { UpdateEssentialGoodRequestDto } from "./dtos-swagger/update-essentialGood-request.dto";
import { GetEssentialGoodsQuery } from "./query/impl/get-essentialGoods.query";
import { CreateEssentialGoodCommand } from "./command/impl/create-essentialGood.imple";
import { GetEssentialGoodByIdQuery } from "./query/impl/get-essentialGood-by-id.query";
import { UpdateEssentialGoodCommand } from "./command/impl/update-essentialGood.imple";
import { DeleteEssentialGoodCommand } from "./command/impl/delete-essentialGood.imple";

@Controller("suppliers")
@ApiTags("suppliers")
export class EssentialGoodController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  @Get("/")
  @ApiOperation({ description: "get list of essential goods" })
  async getUsers(@Query() getUsersRequest: GetEssentialGoodsQuery) {
    return this.queryBus.execute<GetEssentialGoodsQuery>(
      new GetEssentialGoodsQuery(getUsersRequest),
    );
  }

  @Post()
  @ApiOperation({ description: "create a essential good" })
  async createUser(@Body() body: CreateEssentialGoodRequestDto) {
    return this.commandBus.execute(new CreateEssentialGoodCommand(body));
  }

  @Get("/:id")
  @ApiOperation({ description: "get essential good by id" })
  async getUserById(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      categoryId: string,
  ) {
    return this.queryBus.execute(new GetEssentialGoodByIdQuery(categoryId));
  }

  @Put("/:id")
  @ApiOperation({ description: "update an essential good" })
  async updateCategory(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      categoryId,
    @Body() body: UpdateEssentialGoodRequestDto,
  ) {
    return this.commandBus.execute(new UpdateEssentialGoodCommand(body, categoryId));
  }

  @Delete("/:id")
  @ApiOperation({ description: "delete an essential good" })
  async deleteCategory(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      categoryId,
  ) {
    return this.commandBus.execute(new DeleteEssentialGoodCommand(categoryId));
  }
}
