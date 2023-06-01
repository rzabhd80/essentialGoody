import { UpdateMeasurementUnitDto } from "../../dtos";

export class UpdateMeasurementUnitCommand {
  constructor(public readonly updateMeasurementUnit: UpdateMeasurementUnitDto,
              public readonly id) {
  }
}
