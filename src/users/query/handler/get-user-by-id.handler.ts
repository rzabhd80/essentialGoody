import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from "../impl/get-user-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { GetUsersQuery } from "../impl/get-users.query";
import { CustomError, USER_NOT_FOUND } from "../../../../http-exception";
import { firstValueFrom } from "rxjs";
import { Inject } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    public readonly httpService: HttpService
  ) {}

  async execute(query: GetUserByIdQuery) {
    const { userId } = query;
    const url = `https://reqres.in/api/users/${userId}`;
    const { data } = await firstValueFrom(this.httpService.get<User>(url));
    return data;
  }
}
