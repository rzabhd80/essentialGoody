import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { commandHandlers } from "./commands/handler";
import { queryHandlers } from "./query/handler";
import { CqrsModule } from "@nestjs/cqrs";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    JwtModule.registerAsync({
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
  controllers: [AuthController],
  providers: [...commandHandlers, ...queryHandlers],
})
export class AuthModule {
}
