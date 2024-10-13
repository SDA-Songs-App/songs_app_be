import { Test, TestingModule } from '@nestjs/testing';
import { SongCategoriesService } from './song-categories.service';

describe('SongCategoriesService', () => {
  let service: SongCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongCategoriesService],
    }).compile();

    service = module.get<SongCategoriesService>(SongCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
