import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSuppliersQuery } from "../impl/get-suppliers.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { paginate } from "../../../../helpers/paginate";

@Injectable()
@QueryHandler(GetSuppliersQuery)
export class GetSuppliersHandler implements IQueryHandler<GetSuppliersQuery> {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {
  }

  async execute(query: GetSuppliersQuery) {
    const { getCategoriesDto } = query;
    const { page, limit } = getCategoriesDto;
    const queryBuilder = this.userRepo.createQueryBuilder("categories");
    return paginate<User>(queryBuilder, page, limit);
  }
}
