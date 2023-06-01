import { UpdateCategoryDto } from "../../dtos";

export class DeleteCategoryCommand {
  constructor(public readonly id) {
  }
}
