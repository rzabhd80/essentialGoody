import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUsersQuery } from "../impl/get-users.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(@InjectRepository(User) public readonly userRepo: Repository<User>) {
  }

  async execute(query: GetUsersQuery) {
    return this.userRepo.find();
  }
}