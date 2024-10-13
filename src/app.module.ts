import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LyricsModule } from './lyrics/lyrics.module';
import { LyricsContentsModule } from './lyrics-contents/lyrics-contents.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UsersModule, LyricsModule, LyricsContentsModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
