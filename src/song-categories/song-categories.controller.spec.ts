import { Test, TestingModule } from '@nestjs/testing';
import { SongCategoriesController } from './song-categories.controller';

describe('SongCategoriesController', () => {
  let controller: SongCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongCategoriesController],
    }).compile();

    controller = module.get<SongCategoriesController>(SongCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
