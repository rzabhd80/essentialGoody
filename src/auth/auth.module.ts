import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { commandHandlers } from "./commands/handler";
import { queryHandlers } from "./query/handler";
import { CqrsModule } from "@nestjs/cqrs";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "../../libs/entities";

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    TypeOrmModule.forFeature(entities),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [...commandHandlers, ...queryHandlers, AuthService],
})
export class AuthModule {
}
