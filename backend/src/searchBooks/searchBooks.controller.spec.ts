import { Test, TestingModule } from '@nestjs/testing';
import { SearchBooksController } from './searchBooks.controller';

describe('SearchController', () => {
  let controller: SearchBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchBooksController],
    }).compile();

    controller = module.get<SearchBooksController>(SearchBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
