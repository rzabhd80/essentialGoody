import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "process";
import { entities } from "libs/entities";
import { User } from "../libs/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { EventsHandlers } from "./events/handler";
import { Avatar } from "libs/entities/avatar.entity";
import { EssentialGood } from "../libs/entities/essentialGood.entity";
import { Category } from "../libs/entities/category";
import { MeasurementUnit } from "../libs/entities/measurementUnit";
import { MeasurementUnitsModule } from "./measurementUnits/measurementUnits.module";
import { CategoriesModule } from "./categories/categories.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    MeasurementUnitsModule,
    CategoriesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres",
          synchronize: true,
          host: config.get<string>("POSTGRES_HOST"),
          port: config.get<number>("POSTGRES_PORT") || 3000,
          username: config.get<string>("POSTGRES_USER"),
          password: config.get<string>("POSTGRES_PASSWORD"),
          database: config.get<string>("POSTGRES_DATABASE"),
          entities: [User, Avatar, EssentialGood, Category, MeasurementUnit],
        };
      },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>("JWT_SECRET_KEY"),
          signOptions: { expiresIn: "3600s" },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...EventsHandlers],
})
export class AppModule {
}
