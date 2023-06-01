import { Module } from "@nestjs/common";
import { MeasurementUnitsService } from "./measurementUnits.service";
import { MeasurementUnitsController } from "./measurementUnitsController";
import { CqrsModule } from "@nestjs/cqrs";
import { commandsHandlers } from "./command/handler";
import { queryHandlers } from "./query/handler";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "../../libs/entities";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    CqrsModule,
    JwtModule,
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [...commandsHandlers, ...queryHandlers],
  controllers: [MeasurementUnitsController],
})
export class MeasurementUnitsModule {}
