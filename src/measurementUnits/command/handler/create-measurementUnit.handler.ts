import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateMeasurementUnitCommand } from "../impl/create-measurementUnit.imple";
import { Category } from "libs/entities/category";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";
import { MeasurementUnit } from "../../../../libs/entities/measurementUnit";

@Injectable()
@CommandHandler(CreateMeasurementUnitCommand)
export class CreateMeasurementUnitHandler implements ICommandHandler<CreateMeasurementUnitCommand> {
  constructor(
    @InjectRepository(MeasurementUnit) public readonly measurementUnitRepo: Repository<MeasurementUnit>,
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
