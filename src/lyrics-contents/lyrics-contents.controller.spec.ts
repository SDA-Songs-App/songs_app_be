import { Test, TestingModule } from '@nestjs/testing';
import { LyricsContentsController } from './lyrics-contents.controller';

describe('LyricsContentsController', () => {
  let controller: LyricsContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LyricsContentsController],
    }).compile();

    controller = module.get<LyricsContentsController>(LyricsContentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
