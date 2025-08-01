import { Test, TestingModule } from '@nestjs/testing';
import { WikibooksController } from './wikibooks.controller';

describe('WikibooksController', () => {
  let controller: WikibooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WikibooksController],
    }).compile();

    controller = module.get<WikibooksController>(WikibooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
