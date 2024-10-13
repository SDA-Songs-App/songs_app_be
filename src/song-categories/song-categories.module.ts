import { Module } from '@nestjs/common';
import { SongCategoriesController } from './song-categories.controller';
import { SongCategoriesService } from './song-categories.service';

@Module({
  controllers: [SongCategoriesController],
  providers: [SongCategoriesService]
})
export class SongCategoriesModule {}
