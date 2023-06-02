import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateMeasurementUnitCommand } from "../impl/create-measurementUnit.imple";
import { CategoryEntity } from "libs/entities/category.entity";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";
import { MeasurementUnitEntity } from "../../../../libs/entities/measurementUnit.entity";

@Injectable()
@CommandHandler(CreateMeasurementUnitCommand)
export class CreateMeasurementUnitHandler implements ICommandHandler<CreateMeasurementUnitCommand> {
  constructor(
    @InjectRepository(MeasurementUnitEntity) public readonly measurementUnitRepo: Repository<MeasurementUnitEntity>,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: CreateMeasurementUnitCommand) {
    const { createMeasurementUnit } = command;
    const { name, symbol } = createMeasurementUnit;
    const measurementUnit = this.measurementUnitRepo.create({
      name, symbol,
    })
      .save();
    return measurementUnit;
  }
}
