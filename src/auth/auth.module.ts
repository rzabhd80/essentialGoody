import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { commandHandlers } from "./commands/handler";
import { queryHandlers } from "./query/handler";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [AuthService, ...commandHandlers, ...queryHandlers],
})
export class AuthModule {}
