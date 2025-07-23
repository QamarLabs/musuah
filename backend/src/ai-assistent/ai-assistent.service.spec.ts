import { Test, TestingModule } from '@nestjs/testing';
import { AiAssistentService } from './ai-assistent.service';

describe('AiAssistentService', () => {
  let service: AiAssistentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiAssistentService],
    }).compile();

    service = module.get<AiAssistentService>(AiAssistentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
