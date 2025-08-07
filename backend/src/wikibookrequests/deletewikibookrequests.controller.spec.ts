import { Test, TestingModule } from '@nestjs/testing';
import { DeleteWikibookRequestsController } from './deletewikibookrequests.controller';

describe('DeleteWikibookRequestsController', () => {
  let controller: DeleteWikibookRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteWikibookRequestsController],
    }).compile();

    controller = module.get<DeleteWikibookRequestsController>(DeleteWikibookRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
