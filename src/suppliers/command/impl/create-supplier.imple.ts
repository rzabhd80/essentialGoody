import { CreateSupplierDto } from "../../dtos";
export class CreateSupplierCommand {
  constructor(public readonly createCategoryDto: CreateSupplierDto) {}
}
