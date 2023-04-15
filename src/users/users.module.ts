import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { commandHandlers } from "../auth/commands/handler";
import { queryHandlers } from "./query/handler";

@Module({
  imports: [CqrsModule],
  providers: [UsersService, ...commandHandlers, ...queryHandlers],
  controllers: [UsersController],
})
export class UsersModule {}
