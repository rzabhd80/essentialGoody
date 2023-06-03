import { Test, TestingModule } from "@nestjs/testing";
import { SupplierController } from "./supplierController";

describe("UsersController", () => {
  let controller: SupplierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierController],
    }).compile();

    controller = module.get<SupplierController>(SupplierController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});