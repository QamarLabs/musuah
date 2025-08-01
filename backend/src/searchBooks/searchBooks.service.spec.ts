import { Test, TestingModule } from '@nestjs/testing';
import { SearchBooksService } from './searchBooks.service';

describe('SearchBooksService', () => {
  let service: SearchBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchBooksService],
    }).compile();

    service = module.get<SearchBooksService>(SearchBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
