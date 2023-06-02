import { Module } from "@nestjs/common";
import { EssentialGoodService } from "./essentialGood.service";
import { EssentialGoodController } from "./essentialGoodController";
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
  controllers: [EssentialGoodController],
})
export class EssentialGoodModule {
}
