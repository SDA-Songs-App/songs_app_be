import { Test, TestingModule } from '@nestjs/testing';
import { LyricsContentsService } from './lyrics-contents.service';

describe('LyricsContentsService', () => {
  let service: LyricsContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LyricsContentsService],
    }).compile();

    service = module.get<LyricsContentsService>(LyricsContentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
