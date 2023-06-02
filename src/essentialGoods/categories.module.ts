import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoryController } from "./categoryController";
import { CqrsModule } from "@nestjs/cqrs";
import { commandsHandlers } from "./command/handler";
import { queryHandlers } from "./query/handler";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "../../libs/entities";
import { HttpModule } from "@nestjs/axios";
import { commandHandlers } from "../auth/commands/handler";

@Module({
  imports: [
    CqrsModule,
    JwtModule,
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [CategoryController],
})
export class CategoriesModule {
}
