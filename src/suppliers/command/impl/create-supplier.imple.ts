import { CreateSupplierDto } from "../../dtos";
export class CreateCategoryCommand {
  constructor(public readonly createCategoryDto: CreateSupplierDto) {}
}
