import { Module } from '@nestjs/common';
import { LyricsContentsController } from './lyrics-contents.controller';
import { LyricsContentsService } from './lyrics-contents.service';

@Module({
  controllers: [LyricsContentsController],
  providers: [LyricsContentsService]
})
export class LyricsContentsModule {}
