import { GetUsersDto } from "../../dtos/get-users.dto";

export class GetUsersQuery {
  constructor(public readonly getUsersDto : GetUsersDto) {
  }
}