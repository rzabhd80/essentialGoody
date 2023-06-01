import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCategoryByIdQuery } from "../impl/get-category-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { GetCategoriesQuery } from "../impl/get-categories.query";
import { CustomError, USER_NOT_FOUND } from "../../../../http-exception";
import { firstValueFrom } from "rxjs";
import { Inject } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@QueryHandler(GetCategoryByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetCategoryByIdQuery> {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    public readonly httpService: HttpService
  ) {}

  async execute(query: GetCategoryByIdQuery) {
    const { userId } = query;
    const url = `https://reqres.in/api/users/${userId}`;
    const { data } = await firstValueFrom(this.httpService.get<User>(url));
    return data;
  }
}
