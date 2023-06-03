import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CategoryEntity } from "libs/entities/category.entity";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";
import { UpdateMeasurementUnitCommand } from "../impl/update-measurementUnit.imple";
import { UpdateMeasurementUnitDto } from "../../dtos";
import { MeasurementUnitEntity } from "libs/entities/measurementUnit.entity";

@Injectable()
@CommandHandler(UpdateMeasurementUnitCommand)
export class UpdateMeasurementUnitHandler implements ICommandHandler<UpdateMeasurementUnitCommand> {
  constructor(
    @InjectRepository(MeasurementUnitEntity) public readonly measurementUnitRepo: Repository<MeasurementUnitEntity>,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: UpdateMeasurementUnitCommand) {
    const { updateMeasurementUnit, id } = command;
    const { name, symbol } = updateMeasurementUnit;
    const measurementUnit = await this.measurementUnitRepo.findOne({ where: { id: id } });
    if (!measurementUnit) {
      return new CustomError(CATEGORY_NOT_FOUND);
    }
    Object.assign(measurementUnit, { name: name, symbol: symbol });
    return await measurementUnit.save();
  }
}
