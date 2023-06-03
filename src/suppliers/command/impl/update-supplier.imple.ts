import { UpdateSupplierDto } from "../../dtos";

export class UpdateCategoryCommand {
  constructor(public readonly updateCategoryDto: UpdateSupplierDto, public readonly id) {
  }
}
