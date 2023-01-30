import { Test, TestingModule } from '@nestjs/testing';
import { KinopoiskApiService } from './kinopoiskApi.service';

describe('KinopoiskApiService', () => {
  let service: KinopoiskApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KinopoiskApiService],
    }).compile();

    service = module.get<KinopoiskApiService>(KinopoiskApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
