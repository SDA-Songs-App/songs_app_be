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
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { ArtistModule } from './artist/artist.module';
import { ArtistRepository } from './repositories/artist-repo';
import { WebSocketModule } from './web-socket/websocket.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsModule } from './notifications/notifications.module';


@Module({
  imports: [
    UsersModule, 
    LyricsModule, 
    LyricsContentsModule, 
    AlbumModule, 
    SongCategoriesModule, 
    LocalizationModule, 
    ArtistModule, 
    WebSocketModule, 
    AuthModule,
    ConfigModule.forRoot({isGlobal:true}),
    NotificationsModule
  ],
    
  controllers: [
    AppController, 
    LocalizationController, 
    AuthController, 
    NotificationsController, 
    ],
  providers: [
    PrismaService,
    AppService, 
    NotificationsService]
 //   AuthService, JwtService],
})
export class AppModule {}
