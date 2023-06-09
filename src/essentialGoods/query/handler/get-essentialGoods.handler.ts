import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetEssentialGoodsQuery } from "../impl/get-essentialGoods.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { paginate } from "../../../../helpers/paginate";

@Injectable()
@QueryHandler(GetEssentialGoodsQuery)
export class GetEssentialGoodsHandler implements IQueryHandler<GetEssentialGoodsQuery> {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {
  }

  async execute(query: GetEssentialGoodsQuery) {
    const { getCategoriesDto } = query;
    const { page, limit } = getCategoriesDto;
    const queryBuilder = this.userRepo.createQueryBuilder("categories");
    return paginate<User>(queryBuilder, page, limit);
  }
}
