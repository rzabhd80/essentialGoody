import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from "../impl/get-user-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { GetUsersQuery } from "../impl/get-users.query";
import {
  CustomError,
  USER_AVATAR_NOT_FOUND,
  USER_NOT_FOUND,
} from "../../../../http-exception";
import { firstValueFrom } from "rxjs";
import { Inject } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { GetUserAvatarByIdQuery } from "../impl/get-user-avatar.query";
import { Avatar } from "libs/entities/avatar.entity";

@QueryHandler(GetUserAvatarByIdQuery)
export class GetUserAvatarByIdHandler
  implements IQueryHandler<GetUserAvatarByIdQuery>
{
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Avatar)
    public readonly userAvatarRepo: Repository<Avatar>,
    public readonly httpService: HttpService
  ) {}

  async execute(query: GetUserAvatarByIdQuery) {
    const { userId } = query;
    const userAvatar = this.userAvatarRepo.findOne({
      where: { userId: userId },
    });
    if (!userAvatar) {
      return new CustomError(USER_AVATAR_NOT_FOUND);
    }
    return userAvatar;
  }
}
