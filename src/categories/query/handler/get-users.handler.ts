import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCategoriesQuery } from "../impl/get-categories.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { paginate } from "../../../../helpers/paginate";

@Injectable()
@QueryHandler(GetCategoriesQuery)
export class GetUsersHandler implements IQueryHandler<GetCategoriesQuery> {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>
  ) {}

  async execute(query: GetCategoriesQuery) {
    const { getUsersDto } = query;
    const { page, limit } = getUsersDto;
    const queryBuilder = this.userRepo.createQueryBuilder("users");
    return paginate<User>(queryBuilder, page, limit);
  }
}
