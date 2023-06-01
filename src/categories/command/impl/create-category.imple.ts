import { CreateCategoryDto } from "../../dtos";
export class CreateCategoryCommand {
  constructor(public readonly createCategoryDto: CreateCategoryDto) {}
}
