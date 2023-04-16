import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from "../impl/get-user-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { GetUsersQuery } from "../impl/get-users.query";
import { CustomError, USER_NOT_FOUND } from "../../../../http-exception";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {
  }

  async execute(query: GetUserByIdQuery) {
    const { userId } = query;
    const user = this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new CustomError(USER_NOT_FOUND);
    }
    return user;
  }
}