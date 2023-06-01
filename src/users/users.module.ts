import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { commandHandlers } from "../auth/commands/handler";
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
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [UsersController],
})
export class UsersModule {}
