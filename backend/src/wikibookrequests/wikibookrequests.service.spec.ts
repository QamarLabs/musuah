import { Test, TestingModule } from '@nestjs/testing';
import { WikibookRequestsService } from './wikibookrequests.service';

describe('WikibookRequestsService', () => {
  let service: WikibookRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WikibookRequestsService],
    }).compile();

    service = module.get<WikibookRequestsService>(WikibookRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
