import { CreateEssentialGoodDto } from "../../dtos";
export class CreateEssentialGoodCommand {
  constructor(public readonly createEssentialGoodDto: CreateEssentialGoodDto) {}
}
