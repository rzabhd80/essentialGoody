import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CategoryEntity } from "libs/entities/category.entity";
import { CATEGORY_NOT_FOUND, CustomError, SUPPLIER_NOT_FOUND } from "http-exception";
import { DeleteSupplierCommand } from "../impl/delete-supplier.imple";
import { Supplier } from "../../../../libs/entities/suppliers.entity";
@Injectable()
@CommandHandler(DeleteSupplierCommand)
export class DeleteSupplierHandler implements ICommandHandler<DeleteSupplierCommand> {
  constructor(
    @InjectRepository(Supplier) public readonly supplierRepo: Repository<Supplier>,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: DeleteSupplierCommand) {
    const { id } = command;
    const supplier = await this.supplierRepo.findOne({ where: { id: id } });
    if (!supplier) {
      return new CustomError(SUPPLIER_NOT_FOUND);
    }

    await supplier.softRemove();
    return await supplier.save();
  }
}
