import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { Category } from "libs/entities/category";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";
import { DeleteMeasurementUnitCommand } from "../impl/delete-measurementUnit.imple";
import { MeasurementUnit } from "../../../../libs/entities/measurementUnit";

@Injectable()
@CommandHandler(DeleteMeasurementUnitCommand)
export class DeleteMeasurementUnitHandler implements ICommandHandler<DeleteMeasurementUnitCommand> {
  constructor(
    @InjectRepository(MeasurementUnit) public readonly measurementUnitRepo: Repository<MeasurementUnit>,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: DeleteMeasurementUnitCommand) {
    const { id } = command;
    const measurementUnit = await this.measurementUnitRepo.findOne({ where: { id: id } });
    if (!measurementUnit) {
      return new CustomError(CATEGORY_NOT_FOUND);
    }
    await measurementUnit.softRemove();
    await measurementUnit.save();
  }
}
