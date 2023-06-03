import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMeasurementUnitsQuery } from "../impl/get-measurementUnits.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "libs/entities/user.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { paginate } from "helpers/paginate";

@Injectable()
@QueryHandler(GetMeasurementUnitsQuery)
export class GetMeasurementUnitsHandler implements IQueryHandler<GetMeasurementUnitsQuery> {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {
  }

  async execute(query: GetMeasurementUnitsQuery) {
    const { getCategoriesDto } = query;
    const { page, limit } = getCategoriesDto;
    const queryBuilder = this.userRepo.createQueryBuilder("categories");
    return paginate<User>(queryBuilder, page, limit);
  }
}
