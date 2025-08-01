import { Test, TestingModule } from '@nestjs/testing';
import { WikibookRequestsController } from './wikibookrequests.controller';

describe('WikibookRequestsController', () => {
  let controller: WikibookRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WikibookRequestsController],
    }).compile();

    controller = module.get<WikibookRequestsController>(WikibookRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
