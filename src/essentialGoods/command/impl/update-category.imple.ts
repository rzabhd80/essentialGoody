import { UpdateCategoryDto } from "../../dtos";

export class UpdateCategoryCommand {
  constructor(public readonly updateCategoryDto: UpdateCategoryDto, public readonly id) {
  }
}
