import { Test, TestingModule } from "@nestjs/testing";
import { MeasurementUnitsController } from "./measurementUnitsController";

describe("UsersController", () => {
  let controller: MeasurementUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasurementUnitsController],
    }).compile();

    controller = module.get<MeasurementUnitsController>(MeasurementUnitsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
