import { UpdateSupplierDto } from "../../dtos";

export class UpdateSupplierCommand {
  constructor(public readonly updateCategoryDto: UpdateSupplierDto, public readonly id) {
  }
}
