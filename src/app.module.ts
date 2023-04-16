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

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
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
          entities: [User],
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
  providers: [AppService],
})
export class AppModule {
}
