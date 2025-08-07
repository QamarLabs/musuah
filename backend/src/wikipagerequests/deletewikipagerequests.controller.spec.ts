import { Test, TestingModule } from '@nestjs/testing';
import { DeleteWikipagerequestsController } from './deletewikipagerequests.controller';

describe('DeleteWikipagerequestsController', () => {
  let controller: DeleteWikipagerequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteWikipagerequestsController],
    }).compile();

    controller = module.get<DeleteWikipagerequestsController>(DeleteWikipagerequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
