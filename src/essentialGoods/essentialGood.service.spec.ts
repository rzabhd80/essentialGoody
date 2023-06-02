import { Test, TestingModule } from "@nestjs/testing";
import { EssentialGoodService } from "./essentialGood.service";

describe("UsersService", () => {
  let service: EssentialGoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EssentialGoodService],
    }).compile();

    service = module.get<EssentialGoodService>(EssentialGoodService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
