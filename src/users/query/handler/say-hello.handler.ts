import { Injectable } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUsersQuery } from "../impl/get-users.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { paginate } from "../../../../helpers/paginate";
import { SayHelloQuery } from "../impl/say-hello.query";

@Injectable()
@QueryHandler(SayHelloQuery)
export class SayHelloHandler implements IQueryHandler<SayHelloQuery> {
  constructor() {
  }

  async execute(query: SayHelloQuery) {
    const { sayHelloDto } = query;
    const { name } = sayHelloDto;
    return {
      "message": `Hello ${name}`,
    };
  }
}