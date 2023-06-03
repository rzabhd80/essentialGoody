import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSupplierByIdQuery } from "../impl/get-supplier-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { GetSuppliersQuery } from "../impl/get-suppliers.query";
import { CATEGORY_NOT_FOUND, CustomError, USER_NOT_FOUND } from "../../../../http-exception";
import { firstValueFrom } from "rxjs";
import { Inject } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { CategoryEntity } from "../../../../libs/entities/category.entity";

@QueryHandler(GetSupplierByIdQuery)
export class GetSupplierByIdHandler implements IQueryHandler<GetSupplierByIdQuery> {
  constructor(
    @InjectRepository(CategoryEntity) public readonly categoryRepo: Repository<CategoryEntity>,
  ) {
  }

  async execute(query: GetSupplierByIdQuery) {
    const { categoryId } = query;
    const category = await this.categoryRepo.findOne({ where: { id: categoryId } });
    if (!category) {
      return new CustomError(CATEGORY_NOT_FOUND);
    }
  }
}
