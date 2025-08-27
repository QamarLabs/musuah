import { Test, TestingModule } from '@nestjs/testing';
import { MutateDashboardService } from './mutateDashboard.service';

describe('MutateDashboardService', () => {
  let service: MutateDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutateDashboardService],
    }).compile();

    service = module.get<MutateDashboardService>(MutateDashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
