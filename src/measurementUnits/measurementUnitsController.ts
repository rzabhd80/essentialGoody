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
import { GetMeasurementUnitsQuery } from "./query/impl/get-measurementUnits.query";
import { CreateMeasurementUnitRequestDto } from "./dtos-swagger";
import { GetMeasurementUnitByIdQuery } from "./query/impl/get-measurementUnit-by-id.query";
import { UpdateMeasurementUnitRequestDto } from "./dtos-swagger/update-measurementUnit-request.dto";
import { CreateMeasurementUnitCommand } from "./command/impl/create-measurementUnit.imple";
import { UpdateMeasurementUnitCommand } from "./command/impl/update-measurementUnit.imple";
import { DeleteMeasurementUnitCommand } from "./command/impl/delete-measurementUnit.imple";


@Controller("categories")
@ApiTags("categories")
export class MeasurementUnitsController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

  @Get("/")
  @ApiOperation({ description: "get list of measurement units" })
  async getUsers(@Query() getUsersRequest: GetMeasurementUnitsQuery) {
    return this.queryBus.execute<GetMeasurementUnitsQuery>(
      new GetMeasurementUnitsQuery(getUsersRequest),
    );
  }

  @Post()
  @ApiOperation({ description: "create a measurement unit" })
  async createUser(@Body() body: CreateMeasurementUnitRequestDto) {
    return this.commandBus.execute(new CreateMeasurementUnitCommand(body));
  }

  @Get("/:id")
  @ApiOperation({ description: "get category by id" })
  async getUserById(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      measurementId: string,
  ) {
    return this.queryBus.execute(new GetMeasurementUnitByIdQuery(measurementId));
  }

  @Put("/:id")
  @ApiOperation({ description: "update a category" })
  async updateCategory(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      categoryId,
    @Body() body: UpdateMeasurementUnitRequestDto,
  ) {
    return this.commandBus.execute(new UpdateMeasurementUnitCommand(body, categoryId));
  }

  @Delete("/:id")
  @ApiOperation({ description: "delete a category" })
  async deleteCategory(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
      measurementId,
  ) {
    return this.commandBus.execute(new DeleteMeasurementUnitCommand(measurementId));
  }
}
