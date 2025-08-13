import { Module } from '@nestjs/common';
import { LyricsController } from './lyrics.controller';
import { LyricsService } from './lyrics.service';
import { LyricsRepository } from 'src/repositories/lyrics-repo';
import { PrismaService } from 'prisma/prisma-service';

@Module({
  controllers: [LyricsController],
  providers: [LyricsService, LyricsRepository, PrismaService]
})
export class LyricsModule {}
