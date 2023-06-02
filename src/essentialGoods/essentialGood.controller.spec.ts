import { Test, TestingModule } from "@nestjs/testing";
import { EssentialGoodController } from "./essentialGoodController";

describe("EssentialGoodController", () => {
  let controller: EssentialGoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EssentialGoodController],
    }).compile();

    controller = module.get<EssentialGoodController>(EssentialGoodController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
