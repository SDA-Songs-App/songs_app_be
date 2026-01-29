import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepository } from 'src/repositories/artist-repo';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers:[ArtistController],
    providers:[ArtistRepository,ArtistService, PrismaService, ]
})
export class ArtistModule {
    
}
