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
import { GetSuppliersQuery } from "./query/impl/get-suppliers.query";
import { CreateSupplierRequestDto} from "./dtos-swagger";
import { GetSupplierByIdQuery } from "./query/impl/get-supplier-by-id.query";
import { CreateCategoryCommand} from "./command/impl/create-supplier.imple";
import { UpdateSupplierRequestDto } from "./dtos-swagger/update-supplier-request.dto";
import { UpdateCategoryCommand } from "./command/impl/update-supplier.imple";
import { DeleteCategoryCommand } from "./command/impl/delete-supplier.imple";

@Controller("categories")
@ApiTags("categories")
export class SupplierController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  @Get("/")
  @ApiOperation({ description: "get list of categories" })
  async getUsers(@Query() getUsersRequest: GetSuppliersQuery) {
    return this.queryBus.execute<GetSuppliersQuery>(
      new GetSuppliersQuery(getUsersRequest),
    );
  }

  @Post()
  @ApiOperation({ description: "create a user" })
  async createUser(@Body() body: CreateSupplierRequestDto) {
    return this.commandBus.execute(new CreateCategoryCommand(body));
  }

  @Get("/:id")
  @ApiOperation({ description: "get category by id" })
  async getUserById(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      categoryId: string,
  ) {
    return this.queryBus.execute(new GetSupplierByIdQuery(categoryId));
  }

  @Put("/:id")
  @ApiOperation({ description: "update a category" })
  async updateCategory(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      categoryId,
    @Body() body: UpdateSupplierRequestDto,
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
