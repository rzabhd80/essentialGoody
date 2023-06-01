import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCategoryByIdQuery } from "../impl/get-category-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { GetCategoriesQuery } from "../impl/get-categories.query";
import { CATEGORY_NOT_FOUND, CustomError, USER_NOT_FOUND } from "../../../../http-exception";
import { firstValueFrom } from "rxjs";
import { Inject } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Category } from "../../../../libs/entities/category";

@QueryHandler(GetCategoryByIdQuery)
export class GetCategoryByIdHandler implements IQueryHandler<GetCategoryByIdQuery> {
  constructor(
    @InjectRepository(Category) public readonly categoryRepo: Repository<Category>,
  ) {
  }

  async execute(query: GetCategoryByIdQuery) {
    const { categoryId } = query;
    const category = await this.categoryRepo.findOne({ where: { id: categoryId } });
    if (!category) {
      return new CustomError(CATEGORY_NOT_FOUND);
    }
  }
}
