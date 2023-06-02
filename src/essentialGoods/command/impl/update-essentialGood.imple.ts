import { UpdateEssentialGoodDto } from "../../dtos";

export class UpdateEssentialGoodCommand {
  constructor(public readonly updateCategoryDto: UpdateEssentialGoodDto, public readonly id) {

  }
}
