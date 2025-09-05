import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LyricsModule } from './lyrics/lyrics.module';
import { LyricsContentsModule } from './lyrics-contents/lyrics-contents.module';
import { AlbumModule } from './album/album.module';
import { SongCategoriesModule } from './song-categories/song-categories.module';
import { LocalizationController } from './localization/localization.controller';
import { LocalizationModule } from './localization/localization.module';

@Module({
  imports: [UsersModule, LyricsModule, LyricsContentsModule, AlbumModule, SongCategoriesModule, LocalizationModule],
  controllers: [AppController, LocalizationController],
  providers: [AppService],
})
export class AppModule {}
