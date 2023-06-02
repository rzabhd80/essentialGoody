import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CreateEssentialGoodCommand } from "../impl/create-essentialGood.imple";
import { CategoryEntity } from "libs/entities/category.entity";
import {
  CATEGORY_NOT_FOUND,
  CustomError,
  MEASUREMENT_UNIT_NOT_FOUND,
  SUPPLIER_NOT_FOUND,
  USER_NOT_FOUND,
} from "http-exception";
import { Supplier } from "../../../../libs/entities/suppliers.entity";
import { EssentialGood } from "../../../../libs/entities/essentialGood.entity";
import { EssentialGoodSupplier } from "../../../../libs/entities/EssentialGoodSupplier.entity";
import { MeasurementUnitEntity } from "../../../../libs/entities/measurementUnit.entity";

@Injectable()
@CommandHandler(CreateEssentialGoodCommand)
export class CreateEssentialGoodHandler implements ICommandHandler<CreateEssentialGoodCommand> {
  constructor(
    public readonly connection: Connection,
    @InjectRepository(Supplier) public readonly supplierRepo: Repository<Supplier>,
    @InjectRepository(EssentialGood) public readonly essentialGoodRepo: Repository<EssentialGood>,
    @InjectRepository(CategoryEntity) public readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(MeasurementUnitEntity) public readonly measurementUnitRepo: Repository<MeasurementUnitEntity>,
    @InjectRepository(EssentialGoodSupplier) public readonly essentialGoodSupplierRepo: Repository<EssentialGoodSupplier>,
  ) {
  }

  async execute(command: CreateEssentialGoodCommand) {
    const { createEssentialGoodDto } = command;
    const { name, price, supplierId, categoryIds, stock, measurementId } = createEssentialGoodDto;
    const supplier = await this.supplierRepo.findOne({ where: { id: supplierId } });
    const measurementUnit = await this.measurementUnitRepo.findOne({ where: { id: measurementId } });
    let categories: CategoryEntity[] = [];
    if (!measurementId) {
      return new CustomError(MEASUREMENT_UNIT_NOT_FOUND);
    }
    if (!supplier) {
      return new CustomError(SUPPLIER_NOT_FOUND);
    }
    const essentialGoodSupplier = await this.essentialGoodSupplierRepo.create({
      supplierId: supplier.id,
      price,
    });
    for (const id of categoryIds) {
      const category = await this.categoryRepo.findOne({ where: { id } });
      if (!category) {
        return new CustomError(CATEGORY_NOT_FOUND);
      }
      categories.push(category);
    }
    const essentialGood = await this.essentialGoodRepo
      .create({
        name: name,
        measurementUnitId: measurementId,
        stock,
      });
    await this.connection.transaction(async (manager) => {
      await manager.save<MeasurementUnitEntity>(measurementUnit);
      essentialGood.measurementUnitId = measurementUnit.id;
      await manager.save<EssentialGood>(essentialGood);
      await manager.save<CategoryEntity>(categories);
      essentialGood.categories = categories;
      essentialGoodSupplier.essentialGood = essentialGood;
      await manager.save<EssentialGoodSupplier>(essentialGoodSupplier);
    });
  }
}
