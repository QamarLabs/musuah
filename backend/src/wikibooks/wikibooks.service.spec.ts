import { Test, TestingModule } from '@nestjs/testing';
import { WikibooksService } from './wikibooks.service';

describe('WikibooksService', () => {
  let service: WikibooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WikibooksService],
    }).compile();

    service = module.get<WikibooksService>(WikibooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
