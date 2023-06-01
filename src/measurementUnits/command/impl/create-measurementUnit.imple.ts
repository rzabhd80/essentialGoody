import { CreateMeasurementUnitDto } from "../../dtos";
export class CreateMeasurementUnitCommand {
  constructor(public readonly createMeasurementUnit: CreateMeasurementUnitDto) {}
}
