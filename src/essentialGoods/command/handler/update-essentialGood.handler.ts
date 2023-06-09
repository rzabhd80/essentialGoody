import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CategoryEntity } from "libs/entities/category.entity";
import {
  CATEGORY_NOT_FOUND,
  CustomError, ESSENTIAL_GOOD_NOT_FOUND,
  MEASUREMENT_UNIT_NOT_FOUND,
  SUPPLIER_NOT_FOUND,
  USER_NOT_FOUND,
} from "http-exception";
import { Supplier } from "libs/entities/suppliers.entity";
import { EssentialGood } from "libs/entities/essentialGood.entity";
import { EssentialGoodSupplier } from "libs/entities/EssentialGoodSupplier.entity";
import { MeasurementUnitEntity } from "libs/entities/measurementUnit.entity";
import { UpdateEssentialGoodCommand } from "../impl/update-essentialGood.imple";

@Injectable()
@CommandHandler(UpdateEssentialGoodCommand)
export class UpdateEssentialGoodHandler implements ICommandHandler<UpdateEssentialGoodCommand> {
  constructor(
    public readonly connection: Connection,
    @InjectRepository(Supplier) public readonly supplierRepo: Repository<Supplier>,
    @InjectRepository(EssentialGood) public readonly essentialGoodRepo: Repository<EssentialGood>,
    @InjectRepository(CategoryEntity) public readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(MeasurementUnitEntity) public readonly measurementUnitRepo: Repository<MeasurementUnitEntity>,
    @InjectRepository(EssentialGoodSupplier) public readonly essentialGoodSupplierRepo: Repository<EssentialGoodSupplier>,
  ) {
  }

  async execute(command: UpdateEssentialGoodCommand) {
    const { updateCategoryDto, id } = command;
    const { name, price, supplierId, categoryIds, stock, measurementId, essentialGoodSupplierId } = updateCategoryDto;
    const essentialGood = await this.essentialGoodRepo
      .findOne({
        where: { id },
      });
    if (!essentialGood) {
      return new CustomError(ESSENTIAL_GOOD_NOT_FOUND);
    }
    const supplier = await this.supplierRepo.findOne({ where: { id: supplierId } });
    const measurementUnit = await this.measurementUnitRepo.findOne({ where: { id: measurementId } });
    let categories: CategoryEntity[] = [];
    let essentialGoodSuppier: EssentialGoodSupplier[] = [];
    if (!measurementId) {
      return new CustomError(MEASUREMENT_UNIT_NOT_FOUND);
    }
    if (!supplier) {
      return new CustomError(SUPPLIER_NOT_FOUND);
    }

    if (essentialGoodSupplierId) {
      for (const id of essentialGoodSupplierId) {
        essentialGoodSuppier.push(
          await this.essentialGoodSupplierRepo.findOne({ where: { id: id } }));
      }
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
    await this.connection.transaction(async (manager) => {
      await manager.save<MeasurementUnitEntity>(measurementUnit);
      essentialGood.measurementUnitId = measurementUnit.id;
      await manager.save<EssentialGood>(essentialGood);
      await manager.save<CategoryEntity>(categories);
      essentialGood.categories = [...essentialGood.categories, ...categories];
      essentialGoodSupplier.essentialGood = essentialGood;
      await manager.save<EssentialGoodSupplier>(essentialGoodSupplier);
    });
    return await this.essentialGoodRepo.findOne({ where: { id } });
  }
}
