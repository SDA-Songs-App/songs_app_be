import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumRepository } from 'src/repositories/album-repo';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository, PrismaService]
})
export class AlbumModule {}
